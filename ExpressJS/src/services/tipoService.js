const Tipo = require("../models/Tipo");
const { getNextSequence } = require("../utils/sequence");

async function listar() {
  return Tipo.find().sort({ id: 1 });
}

async function obtener(id) {
  return Tipo.findOne({ id });
}

async function buscar(nombre) {
  return Tipo.find({
    estandar: { $regex: nombre, $options: "i" }
  }).sort({ id: 1 });
}

async function agregar(tipo) {
  const id = await getNextSequence("tipo");
  const nuevo = new Tipo({
    id,
    estandar: tipo.estandar
  });
  return nuevo.save();
}

async function modificar(id, tipo) {
  const existe = await Tipo.findOne({ id });
  if (!existe) {
    return null;
  }

  existe.estandar = tipo.estandar;
  return existe.save();
}

async function eliminar(id) {
  const result = await Tipo.deleteOne({ id });
  return result.deletedCount > 0;
}

module.exports = {
  listar,
  obtener,
  buscar,
  agregar,
  modificar,
  eliminar
};
