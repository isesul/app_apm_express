const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'sqlite',
  storage: 'database.sqlite'
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Conectado a la base de datos')
  } catch (err) {
    console.log('Error al conectar a la base de datos:', err)
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }