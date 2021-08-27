const path = require('path')
const nunjucks = require('nunjucks')
const config = require('../config')
const { version } = require('../../package.json')

module.exports = {
  plugin: require('@hapi/vision'),
  options: {
    engines: {
      njk: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, options.environment)

          return (context) => {
            return template.render(context)
          }
        },
        prepare: (options, next) => {
          options.compileOptions.environment = nunjucks.configure([
            path.join(options.relativeTo || process.cwd(), ...options.path),
            'app/views',
            'node_modules/govuk-frontend/'
          ], {
            autoescape: true,
            watch: false
          })

          return next()
        }
      }
    },
    path: ['../views'],
    relativeTo: __dirname,
    isCached: !config.isDev,
    context: {
      appVersion: version,
      assetPath: '/static',
      govukAssetPath: '/assets',
      serviceName: 'Walleys Quarry Incident Form',
      pageTitle: 'Walleys Quarry Incident Form - GOV.UK',
      googleTagManagerKey: config.googleTagManagerKey
    }
  }
}
