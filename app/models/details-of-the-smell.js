const joi = require('joi')
const { BaseViewModel, schemaOptions } = require('./form')

const DESCRIPTION_KEY = 'description'
const DESCRIPTION_LABEL = 'How would you describe the smell?'
const DESCRIPTION_LENGTH = 400

const DATE_KEY = 'date'
const DATE_LABEL = 'What date did you notice the smell?'

const TIME_KEY = 'time'
const TIME_LABEL = 'What time of day did you notice the smell?'
const TIME_PATTERN = /^([0-9]{2}):([0-9]{2})$/
const TIME_OPTIONS = {
  type: 'time',
  hint: {
    text: 'Use the 24 hour clock format for example 13:20'
  }
}

const schema = joi.object().keys({
  [DESCRIPTION_KEY]: joi.string().max(DESCRIPTION_LENGTH).label(DESCRIPTION_LABEL).required().allow(''),
  [DATE_KEY]: joi.date().less('now').label(DATE_LABEL).required(),
  [TIME_KEY]: joi.string().regex(TIME_PATTERN).label(TIME_LABEL).required()
}).options(schemaOptions).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err)

    const date = this.data[DATE_KEY]
    if (date) {
      this.data[DATE_KEY] = date.split('T')[0]
    }

    const DATE_OPTIONS = {
      attributes: { max: (new Date()).toISOString().split('T')[0] },
      type: 'date'
    }

    this.addField(DESCRIPTION_KEY, `${DESCRIPTION_LABEL} (optional)`)
    this.addField(DATE_KEY, DATE_LABEL, 'govuk-input--width-10', DATE_OPTIONS)
    this.addField(TIME_KEY, TIME_LABEL, 'govuk-input--width-5', TIME_OPTIONS)
  }
}

module.exports = {
  schema,
  ViewModel
}
