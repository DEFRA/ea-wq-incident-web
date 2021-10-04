const joi = require('joi')
const { BaseViewModel, baseMessages } = require('./form')

const FIRST_NAME_KEY = 'firstName'
const FIRST_NAME_LABEL = 'First name'
const FIRST_NAME_LENGTH = 60
const FIRST_NAME_OPTIONS = {
  autocomplete: 'given-name',
  spellcheck: false
}
const FIRST_NAME_MESSAGES = {
  'string.empty': `Enter your ${FIRST_NAME_LABEL.toLowerCase()}`
}

const LAST_NAME_KEY = 'lastName'
const LAST_NAME_LABEL = 'Last name'
const LAST_NAME_LENGTH = 60
const LAST_NAME_OPTIONS = {
  autocomplete: 'family-name',
  spellcheck: false
}
const LAST_NAME_MESSAGES = {
  'string.empty': `Enter your ${LAST_NAME_LABEL.toLowerCase()}`
}

const ADDRESS_LINE_1_KEY = 'addressLine1'
const ADDRESS_LINE_1_LABEL = 'Address line 1'
const ADDRESS_LINE_1_LENGTH = 255
const ADDRESS_LINE_1_MESSAGES = {
  'string.empty': `Enter an ${ADDRESS_LINE_1_LABEL.toLowerCase()}`
}

const ADDRESS_LINE_2_KEY = 'addressLine2'
const ADDRESS_LINE_2_LABEL = 'Address line 2'
const ADDRESS_LINE_2_LENGTH = 255

const TOWN_OR_CITY_KEY = 'townOrCity'
const TOWN_OR_CITY_LABEL = 'Town or city'
const TOWN_OR_CITY_LENGTH = 35
const TOWN_OR_CITY_MESSAGES = {
  'string.empty': `Enter a ${TOWN_OR_CITY_LABEL.toLowerCase()}`
}

const COUNTY_KEY = 'county'
const COUNTY_LABEL = 'County'
const COUNTY_LENGTH = 35
const COUNTY_MESSAGES = {
  'string.empty': `Enter a ${COUNTY_LABEL.toLowerCase()}`
}

const POSTCODE_KEY = 'postcode'
const POSTCODE_LABEL = 'Postcode'
const POSTCODE_LENGTH = 10
const POSTCODE_PATTERN = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i
const POSTCODE_MESSAGES = {
  'string.empty': `Enter a ${POSTCODE_LABEL.toLowerCase()}`,
  'string.pattern.base': 'Enter a real postcode'
}

const EMAIL_KEY = 'email'
const EMAIL_LABEL = 'Email address'
const EMAIL_LENGTH = 100
const EMAIL_OPTIONS = {
  hint: {
    text: 'To receive your reference number'
  },
  type: 'email',
  autocomplete: 'email',
  spellcheck: false
}
const EMAIL_MESSAGES = {
  'string.empty': `Enter an ${EMAIL_LABEL.toLowerCase()}`,
  'string.email': 'Enter an email address in the correct format, like name@example.com'
}

const PHONENUMBER_KEY = 'phonenumber'
const PHONENUMBER_LABEL = 'Phone number'
const PHONENUMBER_LENGTH = 20
const PHONENUMBER_OPTIONS = {
  hint: {
    text: 'In addition to your email address in case we need to contact you'
  },
  autocomplete: 'tel'
}

const schema = joi.object().keys({
  [FIRST_NAME_KEY]: joi.string().max(FIRST_NAME_LENGTH).label(FIRST_NAME_LABEL).trim().required().messages(FIRST_NAME_MESSAGES),
  [LAST_NAME_KEY]: joi.string().max(LAST_NAME_LENGTH).label(LAST_NAME_LABEL).trim().required().messages(LAST_NAME_MESSAGES),
  [ADDRESS_LINE_1_KEY]: joi.string().max(ADDRESS_LINE_1_LENGTH).label(ADDRESS_LINE_1_LABEL).trim().required().messages(ADDRESS_LINE_1_MESSAGES),
  [ADDRESS_LINE_2_KEY]: joi.string().max(ADDRESS_LINE_2_LENGTH).label(ADDRESS_LINE_2_LABEL).trim().required().allow(''),
  [TOWN_OR_CITY_KEY]: joi.string().max(TOWN_OR_CITY_LENGTH).label(TOWN_OR_CITY_LABEL).trim().required().messages(TOWN_OR_CITY_MESSAGES),
  [COUNTY_KEY]: joi.string().max(COUNTY_LENGTH).label(COUNTY_LABEL).trim().required().messages(COUNTY_MESSAGES),
  [POSTCODE_KEY]: joi.string().max(POSTCODE_LENGTH).regex(POSTCODE_PATTERN).trim().label(POSTCODE_LABEL).required().messages(POSTCODE_MESSAGES),
  [EMAIL_KEY]: joi.string().email().max(EMAIL_LENGTH).label(EMAIL_LABEL).trim().required().messages(EMAIL_MESSAGES),
  [PHONENUMBER_KEY]: joi.string().max(PHONENUMBER_LENGTH).label(PHONENUMBER_LABEL).trim().required().allow('')
}).messages(baseMessages).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err, {
      pageHeading: 'About you',
      path: '/about-you',
      previousPath: '/'
    })

    this.addField(FIRST_NAME_KEY, FIRST_NAME_LABEL, 'govuk-!-width-two-thirds', FIRST_NAME_OPTIONS)
    this.addField(LAST_NAME_KEY, LAST_NAME_LABEL, 'govuk-!-width-two-thirds', LAST_NAME_OPTIONS)
    this.addField(ADDRESS_LINE_1_KEY, ADDRESS_LINE_1_LABEL, null, { autocomplete: 'address-line1' })
    this.addField(ADDRESS_LINE_2_KEY, `${ADDRESS_LINE_2_LABEL} (optional)`, null, { autocomplete: 'address-line2' })
    this.addField(TOWN_OR_CITY_KEY, TOWN_OR_CITY_LABEL, 'govuk-!-width-two-thirds', { autocomplete: 'address-level2' })
    this.addField(COUNTY_KEY, COUNTY_LABEL, 'govuk-!-width-two-thirds')
    this.addField(POSTCODE_KEY, POSTCODE_LABEL, 'govuk-input--width-10', { autocomplete: 'postal-code' })
    this.addField(EMAIL_KEY, EMAIL_LABEL, 'govuk-!-width-two-thirds', EMAIL_OPTIONS)
    this.addField(PHONENUMBER_KEY, `${PHONENUMBER_LABEL} (optional)`, 'govuk-input--width-10', PHONENUMBER_OPTIONS)
  }
}

module.exports = {
  schema,
  ViewModel
}
