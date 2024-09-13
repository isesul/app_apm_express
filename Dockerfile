# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y package-lock.json (si está disponible)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos del proyecto al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3001

# Define las variables de entorno
ENV DATABASE_URL=sqlite:/app/database.sqlite
ENV ELASTIC_APM_SECRET_TOKEN=your_apm_secret_token
ENV ELASTIC_APM_SERVER_URL=https://elastic.netprovider.cl:8200
env NODE_ENV=production
env SERVICE_NAME=app_apm_express

# Comando para ejecutar la aplicación
CMD ["npm", "start"]