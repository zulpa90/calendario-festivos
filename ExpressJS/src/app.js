const express = require("express");
const cors = require("cors");
const { corsOrigin } = require("./config/env");

const festivoRoutes = require("./routes/festivoRoutes");
const tipoRoutes = require("./routes/tipoRoutes");
const validacionRoutes = require("./routes/validacionRoutes");

const app = express();

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.use("/api/festivos", festivoRoutes);
app.use("/api/tipo", tipoRoutes);
app.use("/festivos", validacionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ mensaje: "Error interno del servidor" });
});

module.exports = app;
