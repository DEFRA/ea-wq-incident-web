const sessionHandler = require('../../services/session-handler')
const { schema, ViewModel, DATE_KEY, TIME_KEY, TIME_HOUR_KEY, TIME_MINUTE_KEY } = require('../../models/details-of-the-smell')
const incidentSchema = require('../../models/schema')
const { sendEmail } = require('../../services/notify')
const logValidationError = require('../../util/log-validation-error')
const dayjs = require('../../util/date-util')

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

      // Build the local date from the date parts
      const localDate = dayjs.tz(date, 'Europe/London').hour(hour).minute(minute)

      // If the datetime is not in the past
      // create a custom error and return
      if (localDate.isAfter(dayjs.tz(dayjs(), 'Europe/London'))) {
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
      value.date = localDate.format('YYYY-MM-DD')
      value.hour = localDate.format('HH')
      value.minute = localDate.format('mm')

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
          logValidationError(request, err)
          const model = new ViewModel(request.payload, err)
          return h.view('details-of-the-smell', model).takeover()
        }
      }
    }
  }
]
