const app = require("./app");
const { port } = require("./config/env");
const { connectToDatabase } = require("./config/db");

async function bootstrap() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`API ejecutandose en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("No fue posible iniciar la aplicacion", error);
    process.exit(1);
  }
}

bootstrap();
