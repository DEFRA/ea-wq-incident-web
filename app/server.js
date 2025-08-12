const config = require('./config')
const hapi = require('@hapi/hapi')

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    routes: {
      security: true
    },
    router: {
      stripTrailingSlash: true
    }
  })

  // Register the plugins
  await server.register(require('./plugins/router'))

  return server
}

module.exports = createServer
