const joi = require('joi')
const { BaseViewModel, baseMessages } = require('./form')

const LOCATION_KEY = 'location'
const LOCATION_LABEL = 'Where did you notice this smell?'
const LOCATION_LENGTH = 400
const LOCATION_OPTIONS = {
  maxlength: LOCATION_LENGTH,
  hint: {
    text: 'Give as much detail as possible, for example the street name, postcode, description of the location'
  }
}
const LOCATION_MESSAGES = {
  'string.empty': 'Enter where you noticed this smell',
  'string.max': `${LOCATION_LABEL.slice(0, -1)} must be ${LOCATION_LENGTH} characters or fewer`
}

const schema = joi.object().keys({
  [LOCATION_KEY]: joi.string().max(LOCATION_LENGTH).label(LOCATION_LABEL).trim().required().messages(LOCATION_MESSAGES)
}).messages(baseMessages).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err, {
      pageHeading: LOCATION_LABEL,
      path: '/where-is-the-smell',
      previousPath: '/is-the-smell-at-home'
    })

    this.addField(LOCATION_KEY, { text: LOCATION_LABEL, classes: 'govuk-label--l', isPageHeading: true }, null, LOCATION_OPTIONS)
  }
}

module.exports = {
  LOCATION_KEY,
  schema,
  ViewModel
}
