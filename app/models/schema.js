const joi = require('joi')
const { schema: aboutYouSchema } = require('./about-you')
const { schema: aboutSmellSchema } = require('./about-the-smell')
const { schema: isSmellAtHomeSchema } = require('./is-the-smell-at-home')
const { schema: whereIsSmellSchema, LOCATION_KEY } = require('./where-is-the-smell')
const { schema: descriptionfSmellSchema } = require('./description-of-the-smell')
const { schema: detailsOfSmellSchema } = require('./details-of-the-smell')

const schema = joi.object().required()
  .concat(aboutYouSchema)
  .concat(aboutSmellSchema)
  .concat(isSmellAtHomeSchema)
  .concat(whereIsSmellSchema)
  .concat(descriptionfSmellSchema)
  .concat(detailsOfSmellSchema)
  // The smell location page may not have been visited
  // so we need to accomodate for that here by marking
  // the key as optional and applying a default
  .keys({
    [LOCATION_KEY]: joi.optional().default('')
  })

module.exports = schema
