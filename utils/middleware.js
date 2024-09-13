require('dotenv').config()
const logger = require('./logger')
const apm = require('./apm')

const requestLogger = (request, response, next) => {
  const logInfo = {
    method: request.method,
    path: request.path,
    body: request.body,
    query: request.query,
    ip: request.ip
  }

  const logMessage = `HTTP ${request.method} ${request.path}`

  logger.info(logMessage, logInfo)
  apm.logger.info(logMessage, logInfo)
  apm.setCustomContext(logInfo)
  apm.setUserContext({
    id: request.user ? request.user.id : undefined,
    username: request.user ? request.user.username : undefined,
  })

  // Capturar el tiempo de respuesta
  const start = Date.now()
  response.on('finish', () => {
    const duration = Date.now() - start
    const logResponse = {
      statusCode: response.statusCode,
      duration: duration
    }
    const responseMessage = `HTTP Response ${response.statusCode} (${duration}ms)`
    logger.info(responseMessage, logResponse)
    apm.logger.info(responseMessage, logResponse)
    apm.setCustomContext({ ...logInfo, ...logResponse })
  })

  next()
}

const unknownEndpoint = (request, response) => {
  const message = `Unknown endpoint: ${request.method} ${request.path}`
  logger.warn(message)
  apm.logger.warn(message, { method: request.method, path: request.path })
  apm.setCustomContext({ error: 'unknown endpoint', method: request.method, path: request.path })
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  const errorMessage = `Error: ${error.message}`
  const errorInfo = {
    stack: error.stack,
    method: request.method,
    path: request.path
  }

  logger.error(errorMessage, errorInfo)
  apm.logger.error(errorMessage, errorInfo)

  apm.captureError(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  // Para errores no manejados específicamente
  response.status(500).json({ error: 'An unexpected error occurred' })
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}