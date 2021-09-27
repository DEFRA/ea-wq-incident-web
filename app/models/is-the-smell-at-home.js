const joi = require('joi')
const { BaseViewModel, schemaOptions } = require('./form')

const AT_HOME_KEY = 'atHome'
const AT_HOME_LABEL = 'Are you experiencing this smell at your home address?'
const AT_HOME_ITEMS = ['Yes', 'No']
const AT_HOME_ITEM_LABELS = ['Yes - the smell is at home', 'No']

const schema = joi.object().keys({
  [AT_HOME_KEY]: joi.string().label(AT_HOME_LABEL).allow(...AT_HOME_ITEMS).required()
}).options(schemaOptions).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err, {
      pageHeading: AT_HOME_LABEL,
      path: '/is-the-smell-at-home',
      previousPath: '/about-the-smell'
    })

    const atHomeOptions = {
      items: AT_HOME_ITEMS.map((value, index) => ({
        value: value,
        text: AT_HOME_ITEM_LABELS[index],
        checked: value === this.data[AT_HOME_KEY]
      })),
      fieldset: {
        legend: {
          text: AT_HOME_LABEL,
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
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
