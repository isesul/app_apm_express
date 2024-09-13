require('dotenv').config()

const apm = require('elastic-apm-node').start({
    serviceName: process.env.SERVICE_NAME,
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
    environment: process.env.NODE_ENV || 'development'
  })
  
  module.exports = apm