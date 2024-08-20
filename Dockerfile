# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia todo el código fuente a la imagen
COPY . .

# Compila la aplicación para producción
RUN npm run build

# Sirve la aplicación con un servidor estático
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expone el puerto que usará la aplicación
EXPOSE 80
