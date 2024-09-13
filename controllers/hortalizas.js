const hortalizasRouter = require('express').Router()
const Hortaliza = require('../models/hortaliza')
const metrics = require('../utils/metrics')

hortalizasRouter.get('/', async (request, response) => {
  const hortalizas = await Hortaliza.findAll()
  response.json(hortalizas)
})

hortalizasRouter.get('/:id', async (request, response) => {
  const hortaliza = await Hortaliza.findByPk(request.params.id)
  if (hortaliza) {
    response.json(hortaliza)
  } else {
    response.status(404).end()
  }
})

hortalizasRouter.post('/', async (request, response) => {
  const { nombre, tipo } = request.body

  const hortaliza = await Hortaliza.create({ nombre, tipo })
  metrics.incrementHortalizasCreated()
  response.status(201).json(hortaliza)
})

hortalizasRouter.delete('/:id', async (request, response) => {
  const hortaliza = await Hortaliza.findByPk(request.params.id)
  if (hortaliza) {
    await hortaliza.destroy()
    metrics.incrementHortalizasDeleted()
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

hortalizasRouter.put('/:id', async (request, response) => {
  const hortaliza = await Hortaliza.findByPk(request.params.id)
  if (hortaliza) {
    hortaliza.nombre = request.body.nombre
    hortaliza.tipo = request.body.tipo
    await hortaliza.save()
    metrics.incrementHortalizasUpdated()
    response.json(hortaliza)
  } else {
    response.status(404).end()
  }
})

module.exports = hortalizasRouter