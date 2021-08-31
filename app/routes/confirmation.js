const joi = require('joi')
const sessionHandler = require('../services/session-handler')
const { sendEmail } = require('../services/notify')
const { schema: aboutYouSchema } = require('../models/about-you')
const { schema: aboutSmellSchema } = require('../models/about-the-smell')
const { schema: isSmellAtHomeSchema } = require('../models/is-the-smell-at-home')
const { schema: whereIsSmellSchema, SMELL_LOCATION_KEY } = require('../models/where-is-the-smell')
const { schema: detailsOfSmellSchema } = require('../models/details-of-the-smell')

const schema = joi.object().required()
  .concat(aboutYouSchema)
  .concat(aboutSmellSchema)
  .concat(isSmellAtHomeSchema)
  .concat(whereIsSmellSchema)
  .concat(detailsOfSmellSchema)
  // The smell location page may not have been visited
  // so we need to accomodate for that here by marking
  // the key as optinoal and applying a default
  .keys({
    [SMELL_LOCATION_KEY]: joi.optional().default('')
  })

function ViewModel (complaint) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    titleText: 'Application complete',
    html: 'Your reference number<br><strong>EA12345</strong>'
  }

  this.complaint = complaint
}

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
