const express = require('express')
const apm = require('./utils/apm')
const app = express()
const cors = require('cors')
const hortalizasRouter = require('./controllers/hortalizas')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

logger.info('Conectando a la base de datos', { url: config.DATABASE_URL })
connectToDatabase()

app.use(apm.middleware.connect())
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/hortalizas', hortalizasRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app