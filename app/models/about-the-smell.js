const joi = require('joi')
const { BaseViewModel, schemaOptions } = require('./form')

const STRENGTH_KEY = 'strength'
const STRENGTH_LABEL = 'How strong is the smell?'
const STRENGTH_ITEMS = [
  'no smell',
  'very weak smell',
  'distinct smell that may make your hair or clothes smell',
  'distinct smell you notice while walking and breathing normally',
  'strong smell that may make your hair or clothes smell',
  'very strong smell that makes you want to leave the area',
  'extremely strong or intolerable smell that makes you hold your breath and leave the area'
]

const schema = joi.object().keys({
  [STRENGTH_KEY]: joi.string().label(STRENGTH_LABEL).allow(...STRENGTH_ITEMS).required()
}).options(schemaOptions).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err)

    const strengthOptions = {
      items: STRENGTH_ITEMS.map(value => ({
        text: value,
        value: value,
        checked: value === this.data[STRENGTH_KEY]
      })),
      fieldset: {
        legend: {
          text: STRENGTH_LABEL
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
