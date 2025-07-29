module.exports = {
  method: 'GET',
  path: '/',
  handler: {
    view: {
      template: 'home',
      context: { noIndex: false }
    }
  }
}
