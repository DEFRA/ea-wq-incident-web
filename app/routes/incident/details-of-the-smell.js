const sessionHandler = require('../../services/session-handler')
const { schema, ViewModel } = require('../../models/details-of-the-smell')
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
      sessionHandler.update(request, 'incident', request.payload)

      const incident = sessionHandler.get(request, 'incident')

      // Validate incident data
      const result = incidentSchema.validate(incident, {
        abortEarly: false
      })

      // Return to the start if the data is invalid
      if (result.error) {
        return h.redirect('/about-you')
      }

      // Use the joi validated value
      const value = result.value

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
