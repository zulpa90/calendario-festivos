const mongoose = require("mongoose");
const { mongoUri } = require("../config/env");
const Tipo = require("../models/Tipo");
const Festivo = require("../models/Festivo");
const Counter = require("../models/Counter");

const tipos = [
  { id: 1, estandar: "Fijo" },
  { id: 2, estandar: "Ley Puente Festivo" },
  { id: 3, estandar: "Basado en Pascua" },
  { id: 4, estandar: "Basado en Pascua y trasladado al lunes" }
];

const festivos = [
  { nombre: "Ano Nuevo", dia: 1, mes: 1, diasPascua: 0, idTipo: 1 },
  { nombre: "Dia del Trabajo", dia: 1, mes: 5, diasPascua: 0, idTipo: 1 },
  { nombre: "Independencia de Colombia", dia: 20, mes: 7, diasPascua: 0, idTipo: 1 },
  { nombre: "Batalla de Boyaca", dia: 7, mes: 8, diasPascua: 0, idTipo: 1 },
  { nombre: "Inmaculada Concepcion", dia: 8, mes: 12, diasPascua: 0, idTipo: 1 },
  { nombre: "Navidad", dia: 25, mes: 12, diasPascua: 0, idTipo: 1 },

  { nombre: "Reyes Magos", dia: 6, mes: 1, diasPascua: 0, idTipo: 2 },
  { nombre: "San Jose", dia: 19, mes: 3, diasPascua: 0, idTipo: 2 },
  { nombre: "San Pedro y San Pablo", dia: 29, mes: 6, diasPascua: 0, idTipo: 2 },
  { nombre: "Asuncion de la Virgen", dia: 15, mes: 8, diasPascua: 0, idTipo: 2 },
  { nombre: "Dia de la Raza", dia: 12, mes: 10, diasPascua: 0, idTipo: 2 },
  { nombre: "Todos los Santos", dia: 1, mes: 11, diasPascua: 0, idTipo: 2 },
  { nombre: "Independencia de Cartagena", dia: 11, mes: 11, diasPascua: 0, idTipo: 2 },

  { nombre: "Jueves Santo", dia: 0, mes: 0, diasPascua: -3, idTipo: 3 },
  { nombre: "Viernes Santo", dia: 0, mes: 0, diasPascua: -2, idTipo: 3 },

  { nombre: "Ascension del Senor", dia: 0, mes: 0, diasPascua: 40, idTipo: 4 },
  { nombre: "Corpus Christi", dia: 0, mes: 0, diasPascua: 61, idTipo: 4 },
  { nombre: "Sagrado Corazon", dia: 0, mes: 0, diasPascua: 68, idTipo: 4 }
];

async function run() {
  await mongoose.connect(mongoUri);

  await Tipo.deleteMany({});
  await Festivo.deleteMany({});
  await Counter.deleteMany({ _id: { $in: ["tipo", "festivo"] } });

  await Tipo.insertMany(tipos);

  const tipoMap = new Map(tipos.map((tipo) => [tipo.id, tipo]));
  const festivosConTipo = festivos.map((festivo, index) => {
    const tipo = tipoMap.get(festivo.idTipo);
    return {
      id: index + 1,
      nombre: festivo.nombre,
      dia: festivo.dia,
      mes: festivo.mes,
      diasPascua: festivo.diasPascua,
      clasificacionFestivo: {
        id: tipo.id,
        estandar: tipo.estandar
      }
    };
  });

  await Festivo.insertMany(festivosConTipo);

  await Counter.updateOne({ _id: "tipo" }, { $set: { seq: tipos.length } }, { upsert: true });
  await Counter.updateOne(
    { _id: "festivo" },
    { $set: { seq: festivosConTipo.length } },
    { upsert: true }
  );

  console.log("Semilla creada correctamente");
  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error("Error al crear semilla", error);
  await mongoose.disconnect();
  process.exit(1);
});
