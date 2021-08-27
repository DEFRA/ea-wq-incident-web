const sessionHandler = require('../../services/session-handler')
const { schema, ViewModel } = require('../../models/details-of-the-smell')

module.exports = [
  {
    method: 'GET',
    path: '/details-of-the-smell',
    handler: (request, h) => {
      const data = sessionHandler.get(request, 'complaint')
      const model = new ViewModel(data)

      return h.view('details-of-the-smell', model)
    }
  },
  {
    method: 'POST',
    path: '/details-of-the-smell',
    handler: (request, h) => {
      sessionHandler.update(request, 'complaint', request.payload)

      return h.redirect('/confirmation')
    },
    options: {
      validate: {
        payload: schema,
        failAction: async (request, h, err) => {
          const model = new ViewModel(request.payload, err)
          return h.view('details-of-the-smell', model).takeover()
        }
      }
    }
  }
]
