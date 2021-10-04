const sessionHandler = require('../../services/session-handler')
const { schema, ViewModel, AT_HOME_KEY } = require('../../models/is-the-smell-at-home')

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
      sessionHandler.update(request, 'incident', request.payload)

      const { [AT_HOME_KEY]: atHome } = request.payload
      const next = atHome === 'No' ? '/where-is-the-smell' : '/description-of-the-smell'
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
