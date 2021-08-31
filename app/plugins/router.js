const routes = [].concat(
  require('../routes/home'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/static'),
  require('../routes/incident/about-you'),
  require('../routes/incident/about-the-smell'),
  require('../routes/incident/is-the-smell-at-home'),
  require('../routes/incident/where-is-the-smell'),
  require('../routes/incident/details-of-the-smell'),
  require('../routes/confirmation'),
  require('../routes/cookies/cookies'),
  require('../routes/accessibility-statement'),
  require('../routes/privacy-notice')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
