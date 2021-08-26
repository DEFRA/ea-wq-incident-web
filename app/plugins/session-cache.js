const config = require('../config')
module.exports = {
  plugin: require('@hapi/yar'),
  options: {
    storeBlank: true,
    maxCookieSize: 4000,
    cookieOptions: {
      password: config.cookiePassword,
      // production is currently not https, so a new cookie is created for every request, including css
      // isSecure: config.env === 'production'
      isSecure: false
    }
  }
}
