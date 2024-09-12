const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { sequelize } = require('../utils/db')
const Hortaliza = require('../models/hortaliza')

beforeEach(async () => {
  await Hortaliza.destroy({ where: {} })
  await Hortaliza.create({ nombre: 'Tomate', tipo: 'Frutos' })
})

describe('GET /api/hortalizas', () => {
  test('hortalizas are returned as json', async () => {
    await api
      .get('/api/hortalizas')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is one hortaliza', async () => {
    const response = await api.get('/api/hortalizas')
    expect(response.body).toHaveLength(1)
  })
})

describe('POST /api/hortalizas', () => {
  test('a valid hortaliza can be added', async () => {
    const newHortaliza = {
      nombre: 'Zanahoria',
      tipo: 'Raíces'
    }

    await api
      .post('/api/hortalizas')
      .send(newHortaliza)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/hortalizas')
    expect(response.body).toHaveLength(2)
    expect(response.body.map(h => h.nombre)).toContain('Zanahoria')
  })
})

afterAll(async () => {
  await sequelize.close()
})