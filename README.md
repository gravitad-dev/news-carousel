# Carousel — Traffic Simulator

Simulador de tráfico de Zafir Analytics (React 19 + Vite 7 + TypeScript). Clickea banners de
campañas sobre portales reales (clonados por el proxy de `zafir-realtime`) y así alimenta las
métricas en tiempo real del dashboard.

## Requisitos

- **Node 22** y npm (Vite 7 requiere Node `^20.19` o `>=22.12`).
- Backend levantado: Strapi en `1340` y `zafir-realtime` en `9001`.

## Variables de entorno

Son opcionales: si no hay `.env`, se usan los defaults. Se resuelven en **build time**.

| Variable | Default | Descripción |
|---|---|---|
| `VITE_STRAPI_URL` | `http://localhost:1340` | Base de Strapi (sin `/api`). |
| `VITE_REALTIME_URL` | `http://localhost:9001` | Base de `zafir-realtime` (clicks, proxy y Socket.IO). |
| `VITE_FRONTEND_URL` | `http://localhost:5173` | Reservada para el link de vuelta al dashboard. |

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Vite (puerto libre, normalmente `5174`). |
| `npm run build` | `tsc -b && vite build` → `dist/`. |
| `npm run preview` | Sirve el build localmente. |
| `npm run lint` | ESLint. |

## Uso

Elegí **Proyecto → Campaña → Portal** y clickeá el banner (1 click, con país aleatorio) o arrancá
el **auto-clicker** (intervalo y batch configurables). Los clicks viajan a `zafir-realtime`, se
persisten en Strapi y se reflejan en el dashboard vía Socket.IO (`campaignUpdated`).

## Docker

```bash
docker compose up -d --build
```

Sirve el `dist` con `serve` (puerto `3001` adentro, **publicado en `5174`**; se cambia con
`CAROUSEL_HOST_PORT`). Las `VITE_*` se pasan como build args y por defecto apuntan a `localhost`.
