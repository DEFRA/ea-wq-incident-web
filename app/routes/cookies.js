module.exports = {
  method: 'GET',
  path: '/cookies',
  handler: {
    view: {
      template: 'cookies',
      context: { noIndex: false }
    }
  }
}
