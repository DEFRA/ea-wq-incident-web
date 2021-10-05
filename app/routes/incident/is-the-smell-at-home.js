const sessionHandler = require('../../services/session-handler')
const { schema, ViewModel, AT_HOME_KEY } = require('../../models/is-the-smell-at-home')
const { LOCATION_KEY } = require('../../models/where-is-the-smell')

module.exports = [
  {
    method: 'GET',
    path: '/is-the-smell-at-home',
    handler: (request, h) => {
      const data = sessionHandler.get(request, 'incident')
      const model = new ViewModel(data)

      return h.view('is-the-smell-at-home', model)
    }
  },
  {
    method: 'POST',
    path: '/is-the-smell-at-home',
    handler: (request, h) => {
      const { [AT_HOME_KEY]: atHome } = request.payload

      // Clear location by setting it to undefined if smell is at home
      const data = atHome === 'Yes'
        ? { [LOCATION_KEY]: undefined, ...request.payload }
        : request.payload

      sessionHandler.update(request, 'incident', data)

      const next = atHome === 'No'
        ? '/where-is-the-smell'
        : '/description-of-the-smell'

      return h.redirect(next)
    },
    options: {
      validate: {
        payload: schema,
        failAction: async (request, h, err) => {
          const model = new ViewModel(request.payload, err)
          return h.view('is-the-smell-at-home', model).takeover()
        }
      }
    }
  }
]
