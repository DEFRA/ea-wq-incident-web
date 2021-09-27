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

const DATE_KEY = 'date'
const DATE_LABEL = 'What date did you notice the smell?'
const DATE_MESSAGES = {
  'string.empty': 'Enter the date you noticed the smell',
  'date.base': 'The date you noticed the smell must be a valid date',
  'date.less': 'The date you noticed the smell must be today or in the past'
}

const TIME_KEY = 'time'
const TIME_LABEL = 'What time of day did you notice the smell?'
const TIME_PATTERN = /^([0-9]{2}):([0-9]{2})$/
const TIME_OPTIONS = {
  type: 'time',
  hint: {
    text: 'Use the 24 hour clock format for example 13:20'
  }
}
const TIME_MESSAGES = {
  'string.empty': 'Enter the time of day you noticed the smell',
  'string.pattern.base': 'The time of day you noticed the smell must be a valid time'
}

const schema = joi.object().keys({
  [DESCRIPTION_KEY]: joi.string().max(DESCRIPTION_LENGTH).label(DESCRIPTION_LABEL).trim().required().allow('').messages(DESCRIPTION_MESSAGES),
  [DATE_KEY]: joi.date().less('now').label(DATE_LABEL).required().messages(DATE_MESSAGES),
  [TIME_KEY]: joi.string().regex(TIME_PATTERN).label(TIME_LABEL).required().messages(TIME_MESSAGES)
}).messages(baseMessages).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err, {
      pageHeading: 'Details of the smell',
      path: '/details-of-the-smell',
      previousPath: '/is-the-smell-at-home'
    })

    const date = this.data[DATE_KEY]
    if (date) {
      this.data[DATE_KEY] = date.split('T')[0]
    }

    const DATE_OPTIONS = {
      attributes: { max: (new Date()).toISOString().split('T')[0] },
      type: 'date'
    }

    this.addField(DESCRIPTION_KEY, `${DESCRIPTION_LABEL} (optional)`, '', DESCRIPTION_OPTIONS)
    this.addField(DATE_KEY, DATE_LABEL, 'govuk-input--width-10', DATE_OPTIONS)
    this.addField(TIME_KEY, TIME_LABEL, 'govuk-input--width-5', TIME_OPTIONS)
  }
}

module.exports = {
  schema,
  ViewModel
}
