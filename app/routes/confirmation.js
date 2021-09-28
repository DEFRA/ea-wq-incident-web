const joi = require('joi')
const sessionHandler = require('../services/session-handler')
const { sendEmail } = require('../services/notify')
const { schema: aboutYouSchema } = require('../models/about-you')
const { schema: aboutSmellSchema } = require('../models/about-the-smell')
const { schema: isSmellAtHomeSchema } = require('../models/is-the-smell-at-home')
const { schema: whereIsSmellSchema, LOCATION_KEY } = require('../models/where-is-the-smell')
const { schema: detailsOfSmellSchema } = require('../models/details-of-the-smell')

const schema = joi.object().required()
  .concat(aboutYouSchema)
  .concat(aboutSmellSchema)
  .concat(isSmellAtHomeSchema)
  .concat(whereIsSmellSchema)
  .concat(detailsOfSmellSchema)
  // The smell location page may not have been visited
  // so we need to accomodate for that here by marking
  // the key as optional and applying a default
  .keys({
    [LOCATION_KEY]: joi.optional().default('')
  })

module.exports = {
  method: 'GET',
  path: '/confirmation',
  options: {
    handler: async (request, h) => {
      const incidentSent = sessionHandler.flash(request, 'incidentSent')

      // Return to the start if incidentSent flag not present
      if (!incidentSent.length) {
        return h.redirect('/')
      }

      return h.view('confirmation')
    }
  }
}
