# MongoDB en Contenedor (Docker)

Esta carpeta contiene una guia para ejecutar MongoDB en Docker e importar datos desde archivos JSON.

## 1. Estructura

- `data/tipos.json`
- `data/festivos.json`

## 2. Levantar MongoDB con Docker

### Opcion recomendada: Docker Compose (MongoDB + API ExpressJS)

Desde la raiz del proyecto (`ProyectoAPIdiasFestivos/`):

```bash
docker compose up -d --build
```

Servicios levantados:

- MongoDB: `localhost:27017`
- API ExpressJS: `localhost:3000`

Para detener todo:

```bash
docker compose down
```

Para eliminar tambien el volumen de datos de Mongo:

```bash
docker compose down -v
```

Nota: la importacion de `tipos.json` y `festivos.json` se ejecuta automaticamente solo en la primera inicializacion del volumen.

### Opcion alternativa: solo MongoDB

Desde la raiz del proyecto:

```bash
docker run -d --name mongodb-festivos \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo:7
```

Verificar que el contenedor esta arriba:

```bash
docker ps
```

## 3. Crear base de datos e importar datos desde archivo

Las colecciones objetivo seran `tipos` y `festivos` dentro de la BD `festivos`.

### Importar `tipos.json`

```bash
docker exec -i mongodb-festivos mongoimport \
  --username admin \
  --password admin123 \
  --authenticationDatabase admin \
  --db festivos \
  --collection tipos \
  --jsonArray \
  --file /dev/stdin < MongoDB/data/tipos.json
```

### Importar `festivos.json`

```bash
docker exec -i mongodb-festivos mongoimport \
  --username admin \
  --password admin123 \
  --authenticationDatabase admin \
  --db festivos \
  --collection festivos \
  --jsonArray \
  --file /dev/stdin < MongoDB/data/festivos.json
```

## 4. Verificar datos importados

```bash
docker exec -it mongodb-festivos mongosh \
  -u admin -p admin123 --authenticationDatabase admin
```

Dentro de `mongosh`:

```javascript
use festivos
db.tipos.countDocuments()
db.festivos.countDocuments()
db.festivos.find().limit(5)
```

## 5. Conexion desde la API ExpressJS

Usa esta variable en `ExpressJS/.env`:

```env
MONGODB_URI=mongodb://admin:admin123@localhost:27017/festivos?authSource=admin
```

## 6. Reimportar datos (opcional)

Si necesitas reemplazar todo antes de importar:

```bash
docker exec -it mongodb-festivos mongosh -u admin -p admin123 --authenticationDatabase admin --eval "use festivos; db.tipos.deleteMany({}); db.festivos.deleteMany({});"
```

## 7. Detener y eliminar contenedor

```bash
docker stop mongodb-festivos
docker rm mongodb-festivos
```

## 8. Uso con Podman Compose

Si trabajas con Podman, ejecuta los comandos desde la raiz del proyecto (`ProyectoAPIdiasFestivos/`).

### Levantar servicios

```bash
podman compose up -d --build
```

### Ver estado de servicios

```bash
podman compose ps
podman ps -a
```

### Ver logs

Usa el nombre del servicio de `docker-compose.yml` (`mongodb` o `express-api`):

```bash
podman compose logs mongodb --tail 80
podman compose logs express-api --tail 80
```

### Importar JSON manualmente con Podman Compose

Windows (CMD):

```bash
type MongoDB\data\tipos.json | podman compose exec -T mongodb mongoimport --username admin --password admin123 --authenticationDatabase admin --db festivos --collection tipos --jsonArray --file /dev/stdin
type MongoDB\data\festivos.json | podman compose exec -T mongodb mongoimport --username admin --password admin123 --authenticationDatabase admin --db festivos --collection festivos --jsonArray --file /dev/stdin
```

Para reemplazar datos existentes, agrega `--drop` al comando `mongoimport`.

### Verificar cantidad de documentos

```bash
podman compose exec -T mongodb mongosh -u admin -p admin123 --authenticationDatabase admin --eval "print(db.getSiblingDB('festivos').tipos.countDocuments())"
podman compose exec -T mongodb mongosh -u admin -p admin123 --authenticationDatabase admin --eval "print(db.getSiblingDB('festivos').festivos.countDocuments())"
```

### Detener y eliminar servicios

```bash
podman compose down
podman compose down -v
```
