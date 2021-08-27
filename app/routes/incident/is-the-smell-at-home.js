const sessionHandler = require('../../services/session-handler')
const { schema, ViewModel } = require('../../models/is-the-smell-at-home')

module.exports = [
  {
    method: 'GET',
    path: '/is-the-smell-at-home',
    handler: (request, h) => {
      const data = sessionHandler.get(request, 'complaint')
      const model = new ViewModel(data)

      return h.view('is-the-smell-at-home', model)
    }
  },
  {
    method: 'POST',
    path: '/is-the-smell-at-home',
    handler: (request, h) => {
      sessionHandler.update(request, 'complaint', request.payload)

      const { smellAtHome } = request.payload
      const next = smellAtHome === 'No' ? '/where-is-the-smell' : '/details-of-the-smell'
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
