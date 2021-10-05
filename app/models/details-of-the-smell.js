const joi = require('joi')
const dayjs = require('dayjs')
const { BaseViewModel, baseMessages } = require('./form')

const DATE_KEY = 'date'
const DATE_LABEL = 'What date did you notice the smell?'
const DATE_MESSAGES = {
  'any.required': 'Select the date you noticed the smell',
  'date.base': 'The date you noticed the smell must be a valid date',
  'date.less': 'The date you noticed the smell must be today or in the past'
}

const TIME_KEY = 'time'
const TIME_HOUR_KEY = 'hour'
const TIME_MINUTE_KEY = 'minute'
const TIME_LABEL = 'What time of day did you notice the smell?'
const TIME_HOUR_LABEL = 'Hour'
const TIME_MINUTE_LABEL = 'Minute'

const TIME_MESSAGES = {
  'string.empty': 'Enter the time of day you noticed the smell',
  'string.pattern.base': 'The time of day you noticed the smell must be a valid time'
}

const TIME_HOUR_MESSAGES = {
  'number.base': 'Enter the hour you noticed the smell'
}

const TIME_MINUTE_MESSAGES = {
  'number.base': 'Enter the minute you noticed the smell',
  'string.empty': 'Enter the minute you noticed the smell',
  'string.pattern.base': 'The time of day you noticed the smell must be a valid time'
}

const schema = joi.object().keys({
  [DATE_KEY]: joi.date().less('now').label(DATE_LABEL).required().messages(DATE_MESSAGES),
  [TIME_HOUR_KEY]: joi.number().min(0).max(23).label(TIME_HOUR_LABEL).required().messages(TIME_HOUR_MESSAGES),
  [TIME_MINUTE_KEY]: joi.number().min(0).max(59).label(TIME_MINUTE_LABEL).required().messages(TIME_MINUTE_MESSAGES)
}).messages(baseMessages).required()

class ViewModel extends BaseViewModel {
  constructor (data, err) {
    super(data, err, {
      pageHeading: 'Details of the smell',
      path: '/details-of-the-smell',
      previousPath: '/description-of-the-smell'
    })

    const dateItems = [...Array(7)].map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - i)
      return dayjs(d)
    })

    const date = this.data[DATE_KEY]
    const dateOptions = {
      items: dateItems.map((day, i) => {
        const value = day.format('YYYY-MM-DD')
        let text

        if (i === 0) {
          text = 'Today'
        } else if (i === 1) {
          text = 'Yesterday'
        } else {
          text = day.format('dddd D MMMM')
        }

        return {
          text,
          value,
          checked: date ? value === dayjs(date).format('YYYY-MM-DD') : false
        }
      }),
      fieldset: {
        legend: {
          text: DATE_LABEL
        }
      }
    }

    const highlight = (classes, addError) => {
      return addError ? `${classes} govuk-input--error` : classes
    }

    const hourError = this.errors?.[TIME_HOUR_KEY]
    const minuteError = this.errors?.[TIME_MINUTE_KEY]
    let errorMessage

    if (hourError && minuteError) {
      const text = TIME_MESSAGES['string.empty']

      // Set a combined error message
      errorMessage = { text }

      // Remove any individual messages from the errors list
      this.errorList = this.errorList
        .filter(e => e.path !== 'hour' && e.path !== 'minute')

      // And replace with a combined message
      this.errorList.push({ path: 'time', text, href: '#hour', type: 'custom' })
    } else if (hourError || minuteError) {
      // Set the error message to the individual error (prioritising "hour" errors)
      errorMessage = hourError || minuteError
    }

    const timeOptions = {
      fieldset: {
        legend: {
          text: DATE_LABEL
        }
      },
      hint: {
        text: 'Use the 24 hour clock format for example 13:20'
      },
      items: [
        {
          id: 'hour',
          classes: highlight('govuk-input--width-2', !!hourError),
          name: 'hour',
          value: this.data.hour
        },
        {
          id: 'minute',
          classes: highlight('govuk-input--width-2', !!minuteError),
          name: 'minute',
          value: this.data.minute
        }
      ],
      errorMessage
    }

    this.addField(DATE_KEY, DATE_LABEL, null, dateOptions)
    this.addField(TIME_KEY, TIME_LABEL, null, timeOptions)
  }
}

module.exports = {
  schema,
  ViewModel
}
