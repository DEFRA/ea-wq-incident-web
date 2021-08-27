const sessionHandler = require('../../services/session-handler')
const { schema, ViewModel } = require('../../models/about-the-smell')

module.exports = [
  {
    method: 'GET',
    path: '/about-the-smell',
    handler: (request, h) => {
      const data = sessionHandler.get(request, 'complaint')
      const model = new ViewModel(data)

      return h.view('about-the-smell', model)
    }
  },
  {
    method: 'POST',
    path: '/about-the-smell',
    handler: (request, h) => {
      sessionHandler.update(request, 'complaint', request.payload)

      return h.redirect('/is-the-smell-at-home')
    },
    options: {
      validate: {
        payload: schema,
        failAction: async (request, h, err) => {
          const model = new ViewModel(request.payload, err)
          return h.view('about-the-smell', model).takeover()
        }
      }
    }
  }
]
