const config = require('../config')
module.exports = {
  plugin: require('@hapi/yar'),
  options: {
    storeBlank: true,
    maxCookieSize: 4000,
    cookieOptions: {
      password: config.cookiePassword,
      isSecure: config.cookieOptions.isSecure
    }
  }
}
