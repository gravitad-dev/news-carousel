# syntax=docker/dockerfile:1

# --- build -------------------------------------------------------------------
# node:22 es obligatorio: Vite 7 requiere Node ^20.19 || >=22.12 (Node 18 falla).
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Vite resuelve las variables VITE_* en BUILD TIME: no llegan desde el runtime
# del contenedor, hay que inyectarlas como build args (ver docker-compose.yml).
ARG VITE_STRAPI_URL=http://localhost:1340
ARG VITE_FRONTEND_URL=http://localhost:5173
ENV VITE_STRAPI_URL=$VITE_STRAPI_URL \
    VITE_FRONTEND_URL=$VITE_FRONTEND_URL

COPY . .
RUN npm run build

# --- serve -------------------------------------------------------------------
FROM node:22-bookworm-slim AS serve

RUN npm install -g serve

WORKDIR /app
COPY --from=build /app/dist .

EXPOSE 3001
CMD ["serve", "-s", ".", "-l", "3001"]
