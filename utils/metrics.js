const apm = require('./apm');

// Métricas para solicitudes activas
let activeRequests = 0;
apm.registerMetric('active_requests', () => activeRequests);

// Métricas para operaciones de hortalizas
let hortalizasCreated = 0;
let hortalizasUpdated = 0;
let hortalizasDeleted = 0;

apm.registerMetric('hortalizas_created', () => hortalizasCreated);
apm.registerMetric('hortalizas_updated', () => hortalizasUpdated);
apm.registerMetric('hortalizas_deleted', () => hortalizasDeleted);

// Funciones para actualizar métricas
function incrementActiveRequests() {
  activeRequests++;
}

function decrementActiveRequests() {
  activeRequests--;
}

function incrementHortalizasCreated() {
  hortalizasCreated++;
}

function incrementHortalizasUpdated() {
  hortalizasUpdated++;
}

function incrementHortalizasDeleted() {
  hortalizasDeleted++;
}

module.exports = {
  incrementActiveRequests,
  decrementActiveRequests,
  incrementHortalizasCreated,
  incrementHortalizasUpdated,
  incrementHortalizasDeleted
};