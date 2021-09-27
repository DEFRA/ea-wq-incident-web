const joi = require('joi')
const { BaseViewModel, baseMessages } = require('./form')

const STRENGTH_KEY = 'strength'
const STRENGTH_LABEL = 'How strong is the smell?'
const STRENGTH_ITEMS = [
  'No smell',
  'Very slight smell',
  'Slight smell',
  'Noticeable smell (a smell you notice while breathing normally)',
  'Distinct smell (a smell that might make your hair and clothes smell)',
  'Overwhelming smell (a smell that makes you want to leave the area)',
  'Intolerable smell (a smell that forces you to hold your breath and leave the area)'
]
const STRENGTH_MESSAGES = {
  'any.required': 'Select how strong the smell is'
}

const schema = joi.object().keys({
  [STRENGTH_KEY]: joi.string().label(STRENGTH_LABEL).allow(...STRENGTH_ITEMS).required().messages(STRENGTH_MESSAGES)
}).messages(baseMessages).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err, {
      pageHeading: STRENGTH_LABEL,
      path: '/about-the-smell',
      previousPath: '/about-you'
    })

    const strengthOptions = {
      items: STRENGTH_ITEMS.map(value => ({
        text: value,
        value: value,
        checked: value === this.data[STRENGTH_KEY]
      })),
      fieldset: {
        legend: {
          text: STRENGTH_LABEL,
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      }
    }

    this.addField(STRENGTH_KEY, STRENGTH_LABEL, null, strengthOptions)
  }
}

module.exports = {
  schema,
  ViewModel
}
