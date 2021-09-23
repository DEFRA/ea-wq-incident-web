const joi = require('joi')
const { BaseViewModel, schemaOptions } = require('./form')

const LOCATION_KEY = 'location'
const LOCATION_LABEL = 'Where did you notice this smell?'
const LOCATION_LENGTH = 400
const LOCATION_OPTIONS = {
  hint: {
    text: 'Give as much detail as possible, for example the street name, postcode, description of the location'
  }
}

const schema = joi.object().keys({
  [LOCATION_KEY]: joi.string().max(LOCATION_LENGTH).label(LOCATION_LABEL).trim().required()
}).options(schemaOptions).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err, LOCATION_LABEL)

    this.addField(LOCATION_KEY, { text: LOCATION_LABEL, classes: 'govuk-label--l', isPageHeading: true }, null, LOCATION_OPTIONS)
  }
}

module.exports = {
  LOCATION_KEY,
  schema,
  ViewModel
}
