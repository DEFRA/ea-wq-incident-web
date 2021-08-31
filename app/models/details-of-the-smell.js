const joi = require('joi')
const { BaseViewModel, schemaOptions } = require('./form')

const SMELL_DESCRIPTION_KEY = 'smellDescription'
const SMELL_DESCRIPTION_LABEL = 'How would you describe the smell'
const SMELL_DESCRIPTION_LENGTH = 400

const DATE_OF_SMELL_KEY = 'dateOfSmell'
const DATE_OF_SMELL_LABEL = 'What date did you notice the smell'

const TIME_OF_SMELL_KEY = 'timeOfSmell'
const TIME_OF_SMELL_LABEL = 'What time of day did you notice the smell'
const TIME_OF_SMELL_OPTIONS = {
  type: 'time',
  hint: {
    text: 'Use the 24 hour clock format for example 13:20'
  }
}

const schema = joi.object().keys({
  [SMELL_DESCRIPTION_KEY]: joi.string().max(SMELL_DESCRIPTION_LENGTH).label(SMELL_DESCRIPTION_LABEL).required().allow(''),
  [DATE_OF_SMELL_KEY]: joi.date().less('now').label(DATE_OF_SMELL_LABEL).required(),
  [TIME_OF_SMELL_KEY]: joi.string().regex(/^([0-9]{2}):([0-9]{2})$/).label(TIME_OF_SMELL_LABEL).required()
}).options(schemaOptions).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err)

    if (this.data.dateOfSmell) {
      this.data.dateOfSmell = this.data.dateOfSmell.split('T')[0]
    }

    const DATE_OF_SMELL_OPTIONS = {
      attributes: { max: (new Date()).toISOString().split('T')[0] },
      type: 'date'
    }

    this.addField(SMELL_DESCRIPTION_KEY, `${SMELL_DESCRIPTION_LABEL} (optional)`)
    this.addField(DATE_OF_SMELL_KEY, DATE_OF_SMELL_LABEL, 'govuk-input--width-10', DATE_OF_SMELL_OPTIONS)
    this.addField(TIME_OF_SMELL_KEY, TIME_OF_SMELL_LABEL, 'govuk-input--width-5', TIME_OF_SMELL_OPTIONS)
  }
}

module.exports = {
  schema,
  ViewModel
}
