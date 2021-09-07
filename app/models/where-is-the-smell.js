const joi = require('joi')
const { BaseViewModel, schemaOptions } = require('./form')

const LOCATION_KEY = 'location'
const LOCATION_LABEL = 'Where did you notice this smell'
const LOCATION_LENGTH = 400
const LOCATION_OPTIONS = {
  hint: {
    text: 'Give as much detail as possible, for example the street name, postcode, description of the location'
  }
}

const schema = joi.object().keys({
  [LOCATION_KEY]: joi.string().max(LOCATION_LENGTH).label(LOCATION_LABEL).required()
}).options(schemaOptions).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err)

    this.addField(LOCATION_KEY, LOCATION_LABEL, null, LOCATION_OPTIONS)
  }
}

module.exports = {
  LOCATION_KEY,
  schema,
  ViewModel
}
