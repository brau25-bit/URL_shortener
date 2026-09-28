# URL Shortener

API REST para crear enlaces cortos y redirigirlos a su URL original. Está construida con TypeScript, Express, PostgreSQL y Redis; PostgreSQL conserva los enlaces y Redis funciona como caché para las redirecciones.

## Tecnologías

- Node.js y TypeScript
- Express 5
- PostgreSQL y Drizzle ORM
- Redis
- Pino
- Jest

## Requisitos

- Node.js 24 o superior
- pnpm 11 o superior
- Docker y Docker Compose (recomendado para PostgreSQL y Redis)

## Configuración

1. Instala las dependencias:

   ```bash
   pnpm install
   ```

2. Crea un archivo `.env` en la raíz del proyecto:

   ```env
   PORT=3000
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=url_shortener
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/url_shortener
   ```

3. Levanta PostgreSQL y Redis:

   ```bash
   docker compose up -d
   ```

4. Aplica las migraciones de la base de datos:

   ```bash
   pnpm exec drizzle-kit migrate
   ```

## Ejecutar el proyecto

Compila y levanta la aplicación:

```bash
pnpm build
pnpm start
```

El servidor queda disponible en `http://localhost:3000`.

## Endpoints

Base URL: `http://localhost:3000/api/v1/urls`

### Estado del servicio

```http
GET /api/v1/urls/health
```

Respuesta:

```json
{
  "healthCheck": "ok"
}
```

### Crear una URL corta

```http
POST /api/v1/urls
Content-Type: application/json
```

Body:

```json
{
  "originalUrl": "https://example.com/articulo"
}
```

Ejemplo con `curl`:

```bash
curl --request POST http://localhost:3000/api/v1/urls \\
  --header 'Content-Type: application/json' \\
  --data '{"originalUrl":"https://example.com/articulo"}'
```

Respuesta exitosa (`200`):

```json
{
  "success": "ok",
  "response": {
    "id": "uuid",
    "originalUrl": "https://example.com/articulo",
    "shortCode": "abc123",
    "createdAt": "2026-09-28T00:00:00.000Z"
  }
}
```

### Redirigir una URL corta

```http
GET /api/v1/urls/:shortCode
```

Ejemplo:

```bash
curl --include http://localhost:3000/api/v1/urls/abc123
```

La respuesta es una redirección permanente (`301`) hacia la URL original. Las consultas de redirección se atienden primero desde Redis; si no hay una entrada en caché, se consulta PostgreSQL y se almacena el resultado en Redis.

## Pruebas

```bash
pnpm test
```

## Estructura del proyecto

```text
src/
├── application/     # Casos de uso
├── domain/          # Entidades, contratos y reglas de negocio
├── infrastructure/  # PostgreSQL, Redis y logging
├── presentation/    # Controladores, rutas y middleware HTTP
└── config/          # Variables de entorno e inyección de dependencias
```

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `pnpm build` | Compila TypeScript en `dist/`. |
| `pnpm start` | Inicia la versión compilada. |
| `pnpm dev` | Compila e inicia la aplicación. |
| `pnpm test` | Ejecuta las pruebas unitarias. |
