const joi = require('joi')
const { BaseViewModel, schemaOptions } = require('./form')

const FIRST_NAME_KEY = 'firstName'
const FIRST_NAME_LABEL = 'First name'
const FIRST_NAME_LENGTH = 60

const LAST_NAME_KEY = 'lastName'
const LAST_NAME_LABEL = 'Last name'
const LAST_NAME_LENGTH = 60

const ADDRESS_KEY = 'address'
const ADDRESS_LABEL = 'House number or name'
const ADDRESS_LENGTH = 70

const ADDRESS_LINE_1_KEY = 'addressLine1'
const ADDRESS_LINE_1_LABEL = 'Address line 1'
const ADDRESS_LINE_1_LENGTH = 70

const ADDRESS_LINE_2_KEY = 'addressLine2'
const ADDRESS_LINE_2_LABEL = 'Address line 2'
const ADDRESS_LINE_2_LENGTH = 70

const TOWN_OR_CITY_KEY = 'townOrCity'
const TOWN_OR_CITY_LABEL = 'Town or city'
const TOWN_OR_CITY_LENGTH = 70

const POSTCODE_KEY = 'postcode'
const POSTCODE_LABEL = 'Postcode'
const POSTCODE_LENGTH = 10
const POSTCODE_PATTERN = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s*[0-9][A-Z]{2}/i

const EMAIL_KEY = 'email'
const EMAIL_LABEL = 'Email address'
const EMAIL_LENGTH = 100
const EMAIL_OPTIONS = {
  hint: {
    text: '(To receive your reference number)'
  }
}

const PHONENUMBER_KEY = 'phonenumber'
const PHONENUMBER_LABEL = 'Phone number'
const PHONENUMBER_LENGTH = 20
const PHONENUMBER_OPTIONS = {
  hint: {
    text: '(as an alternative to an email address in case we need to contact you)'
  }
}

const schema = joi.object().keys({
  [FIRST_NAME_KEY]: joi.string().max(FIRST_NAME_LENGTH).label(FIRST_NAME_LABEL).required(),
  [LAST_NAME_KEY]: joi.string().max(LAST_NAME_LENGTH).label(LAST_NAME_LABEL).required(),
  [ADDRESS_KEY]: joi.string().max(ADDRESS_LENGTH).label(ADDRESS_LABEL).required(),
  [ADDRESS_LINE_1_KEY]: joi.string().max(ADDRESS_LINE_1_LENGTH).label(ADDRESS_LINE_1_LABEL).required(),
  [ADDRESS_LINE_2_KEY]: joi.string().max(ADDRESS_LINE_2_LENGTH).label(ADDRESS_LINE_2_LABEL).required().allow(''),
  [TOWN_OR_CITY_KEY]: joi.string().max(TOWN_OR_CITY_LENGTH).label(TOWN_OR_CITY_LABEL).required(),
  [POSTCODE_KEY]: joi.string().max(POSTCODE_LENGTH).regex(POSTCODE_PATTERN).label(POSTCODE_LABEL).required(),
  [EMAIL_KEY]: joi.string().email().max(EMAIL_LENGTH).label(EMAIL_LABEL).required(),
  [PHONENUMBER_KEY]: joi.string().max(PHONENUMBER_LENGTH).label(PHONENUMBER_LABEL).required().allow('')
}).options(schemaOptions).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err)

    this.addField(FIRST_NAME_KEY, FIRST_NAME_LABEL, 'govuk-input--width-10')
    this.addField(LAST_NAME_KEY, LAST_NAME_LABEL, 'govuk-input--width-10')
    this.addField(ADDRESS_KEY, ADDRESS_LABEL, 'govuk-input--width-10')
    this.addField(ADDRESS_LINE_1_KEY, ADDRESS_LINE_1_LABEL, 'govuk-input--width-20')
    this.addField(ADDRESS_LINE_2_KEY, `${ADDRESS_LINE_2_LABEL} (optional)`, 'govuk-input--width-20')
    this.addField(TOWN_OR_CITY_KEY, TOWN_OR_CITY_LABEL, 'govuk-input--width-20')
    this.addField(POSTCODE_KEY, POSTCODE_LABEL, 'govuk-input--width-10')
    this.addField(EMAIL_KEY, EMAIL_LABEL, 'govuk-input--width-20', EMAIL_OPTIONS)
    this.addField(PHONENUMBER_KEY, `${PHONENUMBER_LABEL} (optional)`, 'govuk-input--width-10', PHONENUMBER_OPTIONS)
  }
}

module.exports = {
  schema,
  ViewModel
}
