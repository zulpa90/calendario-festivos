# Requerimientos

- Base de datos MongoDB ejecutando en local (puerto: 27017)
- Base de datos PostgreSQL ejecutando en local (puerto: 5432)
- NodeJS v20+

# Validar las configuraciones de conexión y redirección

`ExpressJS\.env -> Configuraciones de ExpressJS`
```
# .env
PORT=3000
MONGODB_URI=mongodb://admin:admin123@localhost:27017/festivos?authSource=admin
CORS_ORIGIN=http://localhost:4200
```

`SpringBootApi\calendario-api\src\main\resources\application.properties` -> Configuraciones de SpringBoot
```
# application.properties
spring.application.name=calendario-api
spring.datasource.url=jdbc:postgresql://localhost:5432/calendar
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.username=calendar_user
spring.datasource.password=calendar_pass
spring.jpa.hibernate.ddl-auto=create
spring.sql.init.mode=always
spring.jpa.defer-datasource-initialization=true
festivos.api.url=${API_FESTIVOS_URL:http://localhost:3000/festivos/obtener/}

logging.level.org.hibernate.SQL=DEBUG
```

# Ejecutar aplicación SpringBoot local

```bash
mvnw.cmd spring-boot:run
```

# Ejecutar aplicación ExpressJS local

```bash
npm install
npm run seed # optional: en caso de requerir poblar la MongoDB con los datos del cálculo de festivos
npm start
```