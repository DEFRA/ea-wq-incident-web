const joi = require('joi')
const sessionHandler = require('../services/session-handler')
const { sendEmail } = require('../services/notify')

function ViewModel (complaint) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    titleText: 'Application complete',
    html: 'Your reference number<br><strong>EA12345</strong>'
  }

  this.complaint = complaint
}

const schema = joi.object().keys({
  firstName: joi.string().max(60).required(),
  lastName: joi.string().max(60).required(),
  address: joi.string().max(70).required(),
  addressLine1: joi.string().max(70).required(),
  addressLine2: joi.string().max(70).empty(null).default(''),
  townOrCity: joi.string().max(70).required(),
  postcode: joi.string().max(10).required(),
  email: joi.string().email().max(100).required(),
  phonenumber: joi.string().max(20).empty(null).default(''),
  smellStrength: joi.string().required(),
  smellAtHome: joi.string().required(),
  smellLocation: joi.string().max(400).empty(null).default(''),
  smellDescription: joi.string().max(400).empty(null).default(''),
  dateOfSmell: joi.date().required(),
  timeOfSmell: joi.string().regex(/^([0-9]{2}):([0-9]{2})$/).required()
}).required()

module.exports = {
  method: 'GET',
  path: '/confirmation',
  options: {
    handler: async (request, h) => {
      const complaint = sessionHandler.get(request, 'complaint')

      // Validate config
      const result = schema.validate(complaint, {
        abortEarly: false
      })

      // Return to the start if the data is invalid
      if (result.error) {
        return h.redirect('/')
      }

      // Use the joi validated value
      const value = result.value

      // Send the email
      await sendEmail(value)

      // Clear the session state
      sessionHandler.reset(request)

      return h.view('confirmation', new ViewModel(value))
    }
  }
}
