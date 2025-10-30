### Lite Thinking – Docker Setup

Guía breve para levantar el back (Spring Boot), el front (React + Vite) y Postgres con Docker.

### Estructura
- `app-back/`: Spring Boot (Java 21, Maven)
- `lite-front/`: React + Vite
- `docker-compose.yml`: orquesta DB, back y front

### Requisitos
- Docker y Docker Compose instalados

### Variables de entorno (backend)
Definidas en `app-back/src/main/resources/application.properties` y provistas por `docker-compose.yml`:
- `db_password`: admin
- `db_user`: postgres
- `db_url`: jdbc:postgresql://db:5432/lite_db
- `port`: 8081

Puedes ajustar estos valores editando `docker-compose.yml`.

### Arranque rápido
```bash
docker compose build
docker compose up -d
```

### URLs
- Backend API: `http://localhost:8081`
- Frontend: `http://localhost/`
- Postgres: `localhost:5432` (db: `lite_db`, user: `postgres`, pass: `admin`)

### Comandos útiles
- Ver logs de todos: `docker compose logs -f`
- Ver logs del back: `docker compose logs -f app-back`
- Parar stack: `docker compose down`
- Reconstruir imágenes: `docker compose build --no-cache`

### Ejecutar servicios por separado
Backend (desde `app-back/`):
```bash
docker build -t app-back:latest .
docker run --rm -p 8081:8081 \
  -e db_password=admin \
  -e db_user=postgres \
  -e db_url=jdbc:postgresql://localhost:5432/lite_db \
  -e port=8081 \
  app-back:latest
```

Frontend (desde `lite-front/`):
```bash
docker build -t lite-front:latest .
docker run --rm -p 80:80 lite-front:latest
```

### Notas
- El front consume el back en `http://localhost:8081` (`lite-front/src/config/axios.js`). Con Compose funciona tal cual.
- Si cambias puertos/credenciales, actualiza `docker-compose.yml` (y si aplica, el front).

