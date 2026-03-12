const validacionesService = require("../services/validacionesService");

async function verificar(req, res, next) {
  try {
    const anio = Number(req.params.anio);
    const mes = Number(req.params.mes);
    const dia = Number(req.params.dia);

    const resultado = await validacionesService.validarSiEsFechaValida(anio, mes, dia);
    res.status(200).send(resultado);
  } catch (error) {
    next(error);
  }
}

async function obtener(req, res, next) {
  try {
    const anio = Number(req.params.anio);
    const data = await validacionesService.obtenerFestivosAnio(anio);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  verificar,
  obtener
};
