function logValidationError (request, err) {
  request.log('error', {
    message: 'Form validation error',
    payload: request?.payload,
    details: err?.details
  })
}
module.exports = logValidationError
