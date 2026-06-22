# PetRadar API

API para reportar mascotas perdidas y encontradas con búsqueda geoespacial (PostGIS). Desarrollada con NestJS y TypeORM.

## 🚀 Demo

La API está desplegada en Render:

- **API Base URL:** `https://incident-petradar.onrender.com/api`
- **Documentación Swagger:** `https://incident-petradar.onrender.com/api/docs`
- **Base de datos:** PostgreSQL + PostGIS en Neon

## 📋 Endpoints

### Lost Pets (Mascotas perdidas)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/lost-pets` | Obtener todas las mascotas perdidas activas |
| `POST` | `/api/lost-pets` | Reportar una mascota perdida |

**POST /api/lost-pets**
```json
{
  "title": "Perro perdido - Labrador",
  "description": "Se perdió en la colonia Roma",
  "lat": 19.4269,
  "lon": -99.1674,
  "species": "perro",
  "breed": "Labrador",
  "color": "dorado"
}
```

### Found Pets (Mascotas encontradas)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/found-pets` | Obtener todas las mascotas encontradas |
| `POST` | `/api/found-pets` | Reportar una mascota encontrada |

**POST /api/found-pets**
```json
{
  "title": "Labrador encontrado",
  "description": "Encontramos un labrador dorado en la Roma Sur",
  "lat": 19.427,
  "lon": -99.1675,
  "species": "perro",
  "breed": "Labrador",
  "color": "dorado",
  "finder_name": "Juan Pérez",
  "finder_email": "juan@email.com",
  "finder_phone": "555-1234"
}
```

## 🗺️ Búsqueda Geoespacial

Al reportar una mascota encontrada, el sistema busca automáticamente mascotas perdidas activas en un radio de **500 metros** usando PostGIS (`ST_DWithin`). Si hay coincidencias, se envía una notificación por email con un mapa estático de Mapbox.

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **NestJS** | Framework backend |
| **TypeORM** | ORM para base de datos |
| **PostgreSQL + PostGIS** | Base de datos espacial |
| **Redis** | Caché (opcional) |
| **Nodemailer** | Envío de emails |
| **Mapbox** | Mapas estáticos |
| **Docker** | Contenedorización |
| **Render** | Hosting de la API |
| **Neon** | Hosting de la base de datos |

## 🏗️ Despliegue

### Base de Datos (Neon)
1. Crear proyecto en [Neon](https://neon.tech)
2. Ejecutar `CREATE EXTENSION postgis;`
3. Copiar la connection string

### API (Render)
1. Conectar repositorio de GitHub
2. Crear Web Service con Node
3. Configurar variables de entorno:
   - `DATABASE_URL` — Connection string de Neon
   - `PORT` — 3000
   - `MAILER_EMAIL` — Correo para notificaciones
   - `MAILER_PASSWORD` — Contraseña de app
   - `MAPBOX_TOKEN` — Token de Mapbox

## 📦 Instalación Local

```bash
git clone https://github.com/Lobo-Solitariotoward/Incident-PetRadar.git
cd Incident-PetRadar
npm install

# Iniciar Postgres + Redis con Docker
docker compose up -d

# Copiar .env y configurar
cp .env.example .env

# Iniciar en desarrollo
npm run start:dev
```

## 📄 Licencia

MIT
