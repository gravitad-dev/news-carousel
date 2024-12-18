# Etapa 1: Construcción
FROM node:18 AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencia
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación
FROM node:18 AS serve

# Instala la herramienta "serve" globalmente
RUN npm install -g serve

# Copia los archivos estáticos generados desde la etapa de construcción
COPY --from=build /app/dist /app

# Establece el directorio de trabajo para servir los archivos estáticos
WORKDIR /app

# Expone el puerto 3001
EXPOSE 3001

# Comando para iniciar "serve"
CMD ["serve", "-s", ".", "-l", "3001"]
