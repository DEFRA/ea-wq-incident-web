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
  'custom.empty': 'Enter the time of day you noticed the smell',
  'custom.futuretime': 'Time of day must be in the past'
}

const TIME_HOUR_MESSAGES = {
  'number.base': 'Enter the hour you noticed the smell'
}

const TIME_MINUTE_MESSAGES = {
  'number.base': 'Enter the minute you noticed the smell'
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

    const timeError = this.errors?.[TIME_KEY]
    const hourError = this.errors?.[TIME_HOUR_KEY]
    const minuteError = this.errors?.[TIME_MINUTE_KEY]
    let errorMessage

    if (timeError || (hourError && minuteError)) {
      const type = timeError?.type in TIME_MESSAGES
        ? timeError.type
        : 'custom.empty'

      const text = TIME_MESSAGES[type]

      // Set a combined error message
      errorMessage = { text }

      // Remove any individual messages from the errors list
      this.errorList = this.errorList
        .filter(e => e.path !== TIME_HOUR_KEY && e.path !== TIME_MINUTE_KEY)

      // And replace with a combined message
      this.errorList.push({ path: TIME_KEY, text, href: `#${TIME_HOUR_KEY}`, type })
    } else if (hourError || minuteError) {
      // Set the error message to the individual error (prioritising "hour" errors)
      errorMessage = hourError || minuteError
    }

    const timeOptions = {
      fieldset: {
        legend: {
          text: TIME_LABEL
        }
      },
      hint: {
        text: 'Use the 24 hour clock format for example 13:20'
      },
      items: [
        {
          id: TIME_HOUR_KEY,
          classes: highlight('govuk-input--width-2', timeError || hourError),
          name: TIME_HOUR_KEY,
          value: this.data[TIME_HOUR_KEY]
        },
        {
          id: TIME_MINUTE_KEY,
          classes: highlight('govuk-input--width-2', timeError || minuteError),
          name: TIME_MINUTE_KEY,
          value: this.data[TIME_MINUTE_KEY]
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
  ViewModel,
  DATE_KEY,
  TIME_KEY,
  TIME_HOUR_KEY,
  TIME_MINUTE_KEY
}
