const dayjs = require('dayjs')
const sessionHandler = require('../../services/session-handler')
const { schema, ViewModel, DATE_KEY, TIME_KEY, TIME_HOUR_KEY, TIME_MINUTE_KEY } = require('../../models/details-of-the-smell')
const incidentSchema = require('../../models/schema')
const { sendEmail } = require('../../services/notify')

module.exports = [
  {
    method: 'GET',
    path: '/details-of-the-smell',
    handler: (request, h) => {
      const data = sessionHandler.get(request, 'incident')
      const model = new ViewModel(data)

      return h.view('details-of-the-smell', model)
    }
  },
  {
    method: 'POST',
    path: '/details-of-the-smell',
    handler: async (request, h) => {
      // Form validation has passed
      const payload = request.payload

      // Now need to validate that
      // the datetime is in the past
      const {
        [DATE_KEY]: date,
        [TIME_HOUR_KEY]: hour,
        [TIME_MINUTE_KEY]: minute
      } = payload

      // Build a date from the date parts
      const copyDate = new Date(date.getTime())
      copyDate.setHours(hour)
      copyDate.setMinutes(minute)

      // If the datetime is not in the past
      // create a custom error and return
      if (copyDate > new Date()) {
        const details = [{
          path: [TIME_KEY],
          type: 'custom.futuretime'
        }]

        const model = new ViewModel(request.payload, { details })
        return h.view('details-of-the-smell', model)
      }

      // All page validation checks now complete.
      // Update the session data and get the result.
      sessionHandler.update(request, 'incident', request.payload)
      const incident = sessionHandler.get(request, 'incident')

      // Validate the overall incident data
      const result = incidentSchema.validate(incident, {
        abortEarly: false
      })

      // Return to the start if the data is invalid at this stage
      if (result.error) {
        return h.redirect('/about-you')
      }

      // Get the joi validated value
      const value = result.value

      // Format the date and time fields for the email
      const day = dayjs(copyDate)
      value.date = day.format('YYYY-MM-DD')
      value.hour = day.format('HH')
      value.minute = day.format('mm')

      // Send the email
      await sendEmail(value)

      // Clear session data
      sessionHandler.reset(request)

      // Flash a message for the confirmation page
      sessionHandler.flash(request, 'incidentSent', true)

      return h.redirect('/confirmation')
    },
    options: {
      validate: {
        payload: schema,
        failAction: async (request, h, err) => {
          const model = new ViewModel(request.payload, err)
          return h.view('details-of-the-smell', model).takeover()
        }
      }
    }
  }
]
