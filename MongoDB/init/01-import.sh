#!/bin/bash
set -e

echo "Importando datos iniciales en MongoDB..."

mongoimport \
  --host localhost \
  --port 27017 \
  --username "$MONGO_INITDB_ROOT_USERNAME" \
  --password "$MONGO_INITDB_ROOT_PASSWORD" \
  --authenticationDatabase admin \
  --db festivos \
  --collection tipos \
  --jsonArray \
  --file /import-data/tipos.json

mongoimport \
  --host localhost \
  --port 27017 \
  --username "$MONGO_INITDB_ROOT_USERNAME" \
  --password "$MONGO_INITDB_ROOT_PASSWORD" \
  --authenticationDatabase admin \
  --db festivos \
  --collection festivos \
  --jsonArray \
  --file /import-data/festivos.json

echo "Importacion finalizada"
