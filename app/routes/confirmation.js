const sessionHandler = require('../services/session-handler')
const { sendEmail } = require('../services/notify')

function ViewModel (complaint) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    titleText: 'Application complete',
    html: 'Your reference number<br><strong>EA12345</strong>'
  }

  this.complaint = complaint
}

module.exports = {
  method: 'GET',
  path: '/confirmation',
  options: {
    handler: async (request, h) => {
      const complaint = sessionHandler.get(request, 'complaint')

      // TODODS: Ensure incident data is valid (get schema from plugin?)
      if (!complaint.notifyReceiptId) {
        const result = await sendEmail(complaint)
        sessionHandler.update(request, 'complaint', { notifyReceiptId: result.data.id })

        return h.view('confirmation', new ViewModel(complaint))
      }
    }
  }
}
