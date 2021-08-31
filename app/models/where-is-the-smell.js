const joi = require('joi')
const { BaseViewModel, schemaOptions } = require('./form')

const SMELL_LOCATION_KEY = 'smellLocation'
const SMELL_LOCATION_LABEL = 'Where did you notice this smell'
const SMELL_LOCATION_LENGTH = 400
const SMELL_LOCATION_OPTIONS = {
  hint: {
    text: 'Give as much detail as possible, for example the street name, postcode, description of the location'
  }
}

const schema = joi.object().keys({
  [SMELL_LOCATION_KEY]: joi.string().max(SMELL_LOCATION_LENGTH).label(SMELL_LOCATION_LABEL).required()
}).options(schemaOptions).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err)

    this.addField(SMELL_LOCATION_KEY, SMELL_LOCATION_LABEL, null, SMELL_LOCATION_OPTIONS)
  }
}

module.exports = {
  SMELL_LOCATION_KEY,
  schema,
  ViewModel
}
