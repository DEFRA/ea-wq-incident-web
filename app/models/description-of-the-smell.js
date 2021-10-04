const joi = require('joi')
const { BaseViewModel, baseMessages } = require('./form')

const DESCRIPTION_KEY = 'description'
const DESCRIPTION_LABEL = 'How would you describe the smell?'
const DESCRIPTION_LENGTH = 400
const DESCRIPTION_OPTIONS = {
  maxlength: DESCRIPTION_LENGTH
}
const DESCRIPTION_MESSAGES = {
  'string.max': `${DESCRIPTION_LABEL.slice(0, -1)} must be ${DESCRIPTION_LENGTH} characters or fewer`
}

const schema = joi.object().keys({
  [DESCRIPTION_KEY]: joi.string().max(DESCRIPTION_LENGTH).label(DESCRIPTION_LABEL).trim().required().allow('').messages(DESCRIPTION_MESSAGES)
}).messages(baseMessages).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err, {
      pageHeading: DESCRIPTION_LABEL,
      path: '/description-of-the-smell',
      previousPath: '/is-the-smell-at-home'
    })

    this.addField(DESCRIPTION_KEY, { text: `${DESCRIPTION_LABEL} (optional)`, classes: 'govuk-label--l', isPageHeading: true }, '', DESCRIPTION_OPTIONS)
  }
}

module.exports = {
  schema,
  ViewModel
}
