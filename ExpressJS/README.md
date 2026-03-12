# API Festivos en ExpressJS

Proyecto migrado desde Spring Boot a ExpressJS, manteniendo la logica de negocio para calculo de dias festivos y cambiando persistencia de PostgreSQL a MongoDB.

## 1. Requisitos

- Node.js 20+
- npm 10+
- MongoDB 6+ (local o remoto)
- Docker (opcional)

## 2. Estructura

- `src/models`: esquemas MongoDB
- `src/services`: logica de negocio y calculo de festivos
- `src/controllers`: controladores HTTP
- `src/routes`: rutas de la API
- `src/scripts/seed.js`: carga inicial de tipos y festivos

## 3. Configuracion de MongoDB

1. Crear archivo `.env` en la carpeta `ExpressJS`.
2. Usar como base el archivo `.env.example`.

Ejemplo:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/festivos
CORS_ORIGIN=http://localhost:4200
```

## 4. Instalacion y ejecucion

Desde `ExpressJS/`:

```bash
npm install
npm run seed
npm start
```

Modo desarrollo:

```bash
npm run dev
```

La API queda disponible en `http://localhost:3000`.

## 5. Endpoints disponibles

### Festivos (`/api/festivos`)

- `GET /api/festivos/listar`
- `GET /api/festivos/obtener/:id`
- `POST /api/festivos/agregar`
- `PUT /api/festivos/modificar/:id`
- `DELETE /api/festivos/eliminar/:id`
- `GET /api/festivos/buscar?nombre=texto`
- `GET /api/festivos/tipo/:idTipo`

Ejemplo `POST /api/festivos/agregar`:

```json
{
  "nombre": "Mi Festivo",
  "dia": 10,
  "mes": 6,
  "diasPascua": 0,
  "clasificacionFestivo": {
    "id": 1
  }
}
```

### Tipos (`/api/tipo`)

- `GET /api/tipo/listar`
- `GET /api/tipo/obtener/:id`
- `POST /api/tipo/agregar`
- `PUT /api/tipo/modificar/:id`
- `DELETE /api/tipo/eliminar/:id`
- `GET /api/tipo/buscar?nombre=texto`

Ejemplo `POST /api/tipo/agregar`:

```json
{
  "estandar": "Nuevo tipo"
}
```

### Validacion de fecha (`/festivos`)

- `GET /festivos/verificar/:anio/:mes/:dia`
  - Respuestas: `Es festivo`, `No es festivo`, `Fecha no valida`
- `GET /festivos/obtener/:anio`
  - Retorna lista de festivos del anio en formato `yyyy-mm-dd`

## 6. Docker

### Construir imagen

```bash
docker build -t festivos-expressjs .
```

### Ejecutar contenedor

```bash
docker run --name festivos-expressjs -p 3000:3000 \
  -e PORT=3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/festivos \
  -e CORS_ORIGIN=http://localhost:4200 \
  festivos-expressjs
```

Si MongoDB esta en otro host o en Atlas, ajuste `MONGODB_URI`.

## 7. Verificacion rapida

```bash
curl http://localhost:3000/health
curl http://localhost:3000/festivos/verificar/2026/3/23
curl http://localhost:3000/festivos/obtener/2026
```

## 8. Ejemplos de uso de la API (ExpressJS + MongoDB)

Base URL:

```bash
http://localhost:3000
```

### 8.1 Health check

```bash
curl -X GET "http://localhost:3000/health"
```

### 8.2 Tipos

Listar tipos:

```bash
curl -X GET "http://localhost:3000/api/tipo/listar"
```

Agregar tipo:

```bash
curl -X POST "http://localhost:3000/api/tipo/agregar" \
  -H "Content-Type: application/json" \
  -d "{\"estandar\":\"Tipo prueba API\"}"
```

Buscar tipo por nombre:

```bash
curl -X GET "http://localhost:3000/api/tipo/buscar?nombre=Fijo"
```

### 8.3 Festivos

Listar festivos:

```bash
curl -X GET "http://localhost:3000/api/festivos/listar"
```

Obtener festivo por id:

```bash
curl -X GET "http://localhost:3000/api/festivos/obtener/1"
```

Agregar festivo tipo 1 (fecha fija):

```bash
curl -X POST "http://localhost:3000/api/festivos/agregar" \
  -H "Content-Type: application/json" \
  -d "{\"nombre\":\"Festivo API Demo\",\"dia\":10,\"mes\":6,\"diasPascua\":0,\"clasificacionFestivo\":{\"id\":1}}"
```

Listar festivos por tipo (ejemplo tipo 2):

```bash
curl -X GET "http://localhost:3000/api/festivos/tipo/2"
```

Buscar festivos por nombre:

```bash
curl -X GET "http://localhost:3000/api/festivos/buscar?nombre=Navidad"
```

Modificar festivo (id 1):

```bash
curl -X PUT "http://localhost:3000/api/festivos/modificar/1" \
  -H "Content-Type: application/json" \
  -d "{\"nombre\":\"Ano Nuevo Actualizado\",\"dia\":1,\"mes\":1,\"diasPascua\":0,\"clasificacionFestivo\":{\"id\":1}}"
```

Eliminar festivo (id 18):

```bash
curl -X DELETE "http://localhost:3000/api/festivos/eliminar/18"
```

### 8.4 Validacion de fechas

Validar una fecha puntual:

```bash
curl -X GET "http://localhost:3000/festivos/verificar/2026/3/23"
```

Obtener todos los festivos del anio:

```bash
curl -X GET "http://localhost:3000/festivos/obtener/2026"
```

### 8.5 Verificar datos en MongoDB (opcional)

```bash
podman compose exec -T mongodb mongosh -u admin -p admin123 --authenticationDatabase admin --eval "print(db.getSiblingDB('festivos').tipos.countDocuments())"
podman compose exec -T mongodb mongosh -u admin -p admin123 --authenticationDatabase admin --eval "print(db.getSiblingDB('festivos').festivos.countDocuments())"
```
