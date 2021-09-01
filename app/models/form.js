function mapErrors (err) {
  if (err && Array.isArray(err.details)) {
    const errors = {}
    const errorList = []

    err.details.forEach(error => {
      const path = error.path[0]
      errors[path] = { text: error.message }
      errorList.push({
        text: error.message,
        href: `#${path}`
      })
    })

    return [
      errors,
      errorList
    ]
  }

  return []
}

const schemaOptions = {
  messages: {
    'string.empty': '{{#label}} is required',
    'string.max': '{{#label}} maximum length is {{#limit}}',
    'string.pattern.base': '{{#label}} must follow the correct pattern'
  }
}

class BaseViewModel {
  constructor (data, err) {
    const [errors, errorList] = mapErrors(err)
    this.data = data
    this.errors = errors
    this.errorList = errorList
    this.fields = {}
  }

  registerField (key, config) {
    this.fields[key] = config
  }

  // Common helper to create a govuk component config
  addField (key, label, classes, ...rest) {
    this.registerField(key, Object.assign({
      id: key,
      name: key,
      label: {
        text: label
      },
      value: this.data[key],
      errorMessage: this.errors?.[key],
      classes: classes
    }, ...rest))
  }
}

module.exports = { mapErrors, schemaOptions, BaseViewModel }
