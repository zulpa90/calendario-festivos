const mongoose = require("mongoose");

const tipoSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    estandar: { type: String, required: true, unique: true, trim: true }
  },
  {
    collection: "tipos",
    versionKey: false
  }
);

module.exports = mongoose.model("Tipo", tipoSchema);
