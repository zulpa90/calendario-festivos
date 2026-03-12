const Festivo = require("../models/Festivo");
const Tipo = require("../models/Tipo");
const { getNextSequence } = require("../utils/sequence");

async function resolveClasificacion(clasificacionFestivo) {
  const tipo = await Tipo.findOne({ id: clasificacionFestivo.id });
  if (!tipo) {
    throw new Error("Tipo no encontrado");
  }

  return {
    id: tipo.id,
    estandar: tipo.estandar
  };
}

async function listar() {
  return Festivo.find().sort({ id: 1 });
}

async function obtener(id) {
  return Festivo.findOne({ id });
}

async function buscar(nombre) {
  return Festivo.find({
    nombre: { $regex: nombre, $options: "i" }
  }).sort({ id: 1 });
}

async function agregar(festivo) {
  const id = await getNextSequence("festivo");
  const clasificacionFestivo = await resolveClasificacion(festivo.clasificacionFestivo);

  const nuevo = new Festivo({
    id,
    nombre: festivo.nombre,
    dia: festivo.dia,
    mes: festivo.mes,
    diasPascua: festivo.diasPascua || 0,
    clasificacionFestivo
  });

  return nuevo.save();
}

async function modificar(id, festivo) {
  const actual = await Festivo.findOne({ id });
  if (!actual) {
    return null;
  }

  const clasificacionFestivo = await resolveClasificacion(festivo.clasificacionFestivo);

  actual.nombre = festivo.nombre;
  actual.dia = festivo.dia;
  actual.mes = festivo.mes;
  actual.diasPascua = festivo.diasPascua || 0;
  actual.clasificacionFestivo = clasificacionFestivo;

  return actual.save();
}

async function eliminar(id) {
  const result = await Festivo.deleteOne({ id });
  return result.deletedCount > 0;
}

async function buscarPorTipo(idTipo) {
  return Festivo.find({ "clasificacionFestivo.id": idTipo }).sort({ id: 1 });
}

async function buscarPorDiaMesTipo1(dia, mes) {
  return Festivo.find({
    "clasificacionFestivo.id": 1,
    mes,
    dia
  });
}

module.exports = {
  listar,
  obtener,
  buscar,
  agregar,
  modificar,
  eliminar,
  buscarPorTipo,
  buscarPorDiaMesTipo1
};
