const sessionHandler = require('../../services/session-handler')
const { schema, ViewModel } = require('../../models/about-you')

module.exports = [
  {
    method: 'GET',
    path: '/about-you',
    handler: (request, h) => {
      const data = sessionHandler.get(request, 'incident')
      const model = new ViewModel(data)

      return h.view('about-you', model)
    }
  },
  {
    method: 'POST',
    path: '/about-you',
    handler: (request, h) => {
      sessionHandler.update(request, 'incident', request.payload)

      return h.redirect('/about-the-smell')
    },
    options: {
      validate: {
        payload: schema,
        failAction: async (request, h, err) => {
          const model = new ViewModel(request.payload, err)
          return h.view('about-you', model).takeover()
        }
      }
    }
  }
]
