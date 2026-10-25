# Carousel — Traffic Simulator

Simulador de tráfico de Zafir Analytics (React 19 + Vite 7 + TypeScript). Clickea banners de
campañas sobre portales reales (clonados por el proxy de Strapi) y así alimenta las métricas en
tiempo real del dashboard.

## Requisitos

- **Node 22** y npm (Vite 7 requiere Node `^20.19` o `>=22.12`).
- Backend levantado: Strapi en `1340` (REST + proxy de portales + Socket.IO).

## Variables de entorno

Son opcionales: si no hay `.env`, se usan los defaults. Se resuelven en **build time**.

| Variable | Default | Descripción |
|---|---|---|
| `VITE_STRAPI_URL` | `http://localhost:1340` | Base de Strapi (sin `/api`). De acá salen el catálogo, los clicks y el proxy. |
| `VITE_FRONTEND_URL` | `http://localhost:5173` | Reservada para el link de vuelta al dashboard. |

> Ya no existe `VITE_REALTIME_URL`: los clicks (`POST /api/advertisings/:id/clicks`) y el proxy
> (`GET /api/portal-proxy?url=`) se sirven desde Strapi.

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Vite (puerto libre, normalmente `5174`). |
| `npm run build` | `tsc -b && vite build` → `dist/`. |
| `npm run preview` | Sirve el build localmente. |
| `npm run lint` | ESLint. |

## Uso

Elegí **Proyecto → Campaña → Portal** y clickeá el banner (1 click, con país aleatorio) o arrancá
el **auto-clicker** (intervalo y batch configurables). Los clicks viajan a Strapi, se persisten en
la campaña y se reflejan en el dashboard vía Socket.IO (`campaignUpdated`).

- El catálogo se lee de las rutas dedicadas **`GET /api/carousel/projects`** y
  **`GET /api/carousel/campaigns`** (`auth: false`), no del CRUD de Strapi: el rol *Public* no
  necesita permisos de contenido.
- El portal se pide a **`GET /api/portal-proxy?url=...`** y se renderiza en un `<iframe srcDoc>`.
  Los hosts permitidos los define `PORTAL_ALLOWED_HOSTS` en el backend.
- Los banners con `active: false` se descartan, así que un banner desactivado desde la edición de
  campaña no aparece en el carrusel.

## Docker

```bash
docker compose up -d --build
```

Sirve el `dist` con `serve` (puerto `3001` adentro, **publicado en `5174`**; se cambia con
`CAROUSEL_HOST_PORT`). Las `VITE_*` se pasan como build args y por defecto apuntan a `localhost`.

En producción: `VITE_STRAPI_URL=https://zafir-analytics-back-v2.cognitfy.com` y
`VITE_FRONTEND_URL=https://zafir-analytics-v2.cognitfy.com`.
