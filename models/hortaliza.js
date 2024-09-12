const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Hortaliza extends Model {}

Hortaliza.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('Tubérculos', 'Raíces', 'Tallos', 'Flores', 'Frutos', 'Bulbo', 'Semillas', 'Verduras'),
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'hortaliza'
})

module.exports = Hortaliza