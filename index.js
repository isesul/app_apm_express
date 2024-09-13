require('./utils/apm')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Servidor ejecutándose`, { port: config.PORT })
})