const mongoose = require("mongoose");
const { mongoUri } = require("./env");

async function connectToDatabase() {
  await mongoose.connect(mongoUri);
  console.log("MongoDB conectado");
}

module.exports = { connectToDatabase };
