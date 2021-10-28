const sessionHandler = require('../../services/session-handler')
const { schema, ViewModel } = require('../../models/description-of-the-smell')
const logValidationError = require('../../util/log-validation-error')

module.exports = [
  {
    method: 'GET',
    path: '/description-of-the-smell',
    handler: (request, h) => {
      const data = sessionHandler.get(request, 'incident')
      const model = new ViewModel(data)

      return h.view('description-of-the-smell', model)
    }
  },
  {
    method: 'POST',
    path: '/description-of-the-smell',
    handler: async (request, h) => {
      sessionHandler.update(request, 'incident', request.payload)

      return h.redirect('/details-of-the-smell')
    },
    options: {
      validate: {
        payload: schema,
        failAction: async (request, h, err) => {
          logValidationError(request, err)
          const model = new ViewModel(request.payload, err)
          return h.view('description-of-the-smell', model).takeover()
        }
      }
    }
  }
]
