const config = require('./config')
const hapi = require('@hapi/hapi')

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  // Register the plugins
  await server.register(require('@hapi/inert'))
  await server.register({
    plugin: require('@envage/hapi-govuk-question-page'),
    options: {
      pageTemplateName: '_layout.njk'
    }
  })
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/session-cache'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/cookies'))

  return server
}

module.exports = createServer
