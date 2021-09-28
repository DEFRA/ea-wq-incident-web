const sessionHandler = require('../services/session-handler')

module.exports = {
  method: 'GET',
  path: '/confirmation',
  options: {
    handler: async (request, h) => {
      const incidentSent = sessionHandler.flash(request, 'incidentSent')

      // Return to the start if incidentSent flag not present
      if (!incidentSent?.length) {
        return h.redirect('/')
      }

      return h.view('confirmation')
    }
  }
}
