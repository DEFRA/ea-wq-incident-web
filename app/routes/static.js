const config = require('../config')

module.exports = [
  {
    method: 'GET',
    path: '/robots.txt',
    handler: {
      file: 'app/static/robots.txt'
    }
  },
  {
    method: 'GET',
    path: '/assets/{path*}',
    options: {
      handler: {
        directory: {
          path: [
            'node_modules/govuk-frontend/govuk/assets',
            'app/static'
          ]
        }
      },
      cache: {
        expiresIn: config.staticCacheTimeoutMillis,
        privacy: 'private'
      }
    }
  },
  {
    method: 'GET',
    path: '/static/{path*}',
    options: {
      handler: {
        directory: {
          path: [
            'node_modules/govuk-frontend/govuk/assets',
            'app/dist'
          ]
        }
      },
      cache: {
        expiresIn: config.staticCacheTimeoutMillis,
        privacy: 'private'
      }
    }
  }
]
