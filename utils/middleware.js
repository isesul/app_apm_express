const logger = require('./logger')
const apm = require('./apm')

const requestLogger = (request, response, next) => {
  logger.info('HTTP Request', {
    method: request.method,
    path: request.path,
    body: request.body
  })
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error('Error', {
    message: error.message,
    stack: error.stack
  })

  apm.captureError(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}