const mongoose = require("mongoose");

const clasificacionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    estandar: { type: String, required: true }
  },
  { _id: false }
);

const festivoSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true, unique: true, trim: true },
    dia: { type: Number, required: true },
    mes: { type: Number, required: true },
    diasPascua: { type: Number, default: 0 },
    clasificacionFestivo: { type: clasificacionSchema, required: true }
  },
  {
    collection: "festivos",
    versionKey: false
  }
);

module.exports = mongoose.model("Festivo", festivoSchema);
