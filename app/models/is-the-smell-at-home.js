const joi = require('joi')
const { BaseViewModel, schemaOptions } = require('./form')

const SMELL_AT_HOME_KEY = 'smellAtHome'
const SMELL_AT_HOME_LABEL = 'Are you experiencing this smell at your home address'
const SMELL_AT_HOME_ITEMS = ['Yes', 'No']

const schema = joi.object().keys({
  [SMELL_AT_HOME_KEY]: joi.string().label(SMELL_AT_HOME_LABEL).allow(...SMELL_AT_HOME_ITEMS).required()
}).options(schemaOptions).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err)

    const smellAtHomeOptions = {
      items: SMELL_AT_HOME_ITEMS.map(value => ({
        text: value,
        value: value,
        checked: value === this.data[SMELL_AT_HOME_KEY]
      })),
      fieldset: {
        legend: {
          text: SMELL_AT_HOME_LABEL
        }
      }
    }

    this.addField(SMELL_AT_HOME_KEY, SMELL_AT_HOME_LABEL, null, smellAtHomeOptions)
  }
}

module.exports = {
  schema,
  ViewModel
}
