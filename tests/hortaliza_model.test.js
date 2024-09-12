const { sequelize } = require('../utils/db')
const Hortaliza = require('../models/hortaliza')

beforeAll(async () => {
  await sequelize.sync({ force: true })
})

describe('Hortaliza model', () => {
  test('can create a hortaliza', async () => {
    const hortaliza = await Hortaliza.create({
      nombre: 'Zanahoria',
      tipo: 'Raíces'
    })
    expect(hortaliza.nombre).toBe('Zanahoria')
    expect(hortaliza.tipo).toBe('Raíces')
  })

  test('cannot create a hortaliza with invalid type', async () => {
    await expect(Hortaliza.create({
      nombre: 'Invalido',
      tipo: 'TipoInvalido'
    })).rejects.toThrow()
  })
})

afterAll(async () => {
  await sequelize.close()
})