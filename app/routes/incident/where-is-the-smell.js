const sessionHandler = require('../../services/session-handler')
const { schema, ViewModel } = require('../../models/where-is-the-smell')

module.exports = [
  {
    method: 'GET',
    path: '/where-is-the-smell',
    handler: (request, h) => {
      const data = sessionHandler.get(request, 'complaint')
      const model = new ViewModel(data)

      return h.view('where-is-the-smell', model)
    }
  },
  {
    method: 'POST',
    path: '/where-is-the-smell',
    handler: (request, h) => {
      sessionHandler.update(request, 'complaint', request.payload)

      return h.redirect('/details-of-the-smell')
    },
    options: {
      validate: {
        payload: schema,
        failAction: async (request, h, err) => {
          const model = new ViewModel(request.payload, err)
          return h.view('where-is-the-smell', model).takeover()
        }
      }
    }
  }
]
