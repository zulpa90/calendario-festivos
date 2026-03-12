const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/festivos",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:4200"
};
