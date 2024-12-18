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
FROM nginx:1.25

# Copia los archivos estáticos generados a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia la configuración de Nginx personalizada (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
