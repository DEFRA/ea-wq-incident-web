const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

// Load dayjs timezone support
// (dependent on utc plugin)
dayjs.extend(utc)
dayjs.extend(timezone)

module.exports = dayjs
