const joi = require('joi')
const { BaseViewModel, schemaOptions } = require('./form')

const SMELL_STRENGTH_KEY = 'smellStrength'
const SMELL_STRENGTH_LABEL = 'How strong is the smell'
const SMELL_STRENGTH_ITEMS = [
  'no smell',
  'very weak smell',
  'distinct smell that may make your hair or clothes smell',
  'distinct smell you notice while walking and breathing normally',
  'strong smell that may make your hair or clothes smell',
  'very strong smell that makes you want to leave the area',
  'extremely strong or intolerable smell that makes you hold your breath and leave the area'
]

const schema = joi.object().keys({
  [SMELL_STRENGTH_KEY]: joi.string().label(SMELL_STRENGTH_LABEL).allow(...SMELL_STRENGTH_ITEMS).required()
}).options(schemaOptions).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err)

    const smellStrengthOptions = {
      items: SMELL_STRENGTH_ITEMS.map(value => ({
        text: value,
        value: value,
        checked: value === this.data[SMELL_STRENGTH_KEY]
      })),
      fieldset: {
        legend: {
          text: SMELL_STRENGTH_LABEL
        }
      }
    }

    this.addField(SMELL_STRENGTH_KEY, SMELL_STRENGTH_LABEL, null, smellStrengthOptions)
  }
}

module.exports = {
  schema,
  ViewModel
}
