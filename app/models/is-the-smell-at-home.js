const joi = require('joi')
const { BaseViewModel, schemaOptions } = require('./form')

const AT_HOME_KEY = 'atHome'
const AT_HOME_LABEL = 'Are you experiencing this smell at your home address?'
const AT_HOME_ITEMS = ['Yes', 'No']

const schema = joi.object().keys({
  [AT_HOME_KEY]: joi.string().label(AT_HOME_LABEL).allow(...AT_HOME_ITEMS).required()
}).options(schemaOptions).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err)

    const atHomeOptions = {
      items: AT_HOME_ITEMS.map(value => ({
        text: value,
        value: value,
        checked: value === this.data[AT_HOME_KEY]
      })),
      fieldset: {
        legend: {
          text: AT_HOME_LABEL
        }
      }
    }

    this.addField(AT_HOME_KEY, AT_HOME_LABEL, null, atHomeOptions)
  }
}

module.exports = {
  schema,
  ViewModel,
  AT_HOME_KEY
}
