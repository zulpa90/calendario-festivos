const festivoService = require("./festivoService");
const {
  addDays,
  dateUTC,
  formatDateISO,
  getEasterSunday,
  getNextMonday,
  isSameDate,
  isValidDate
} = require("../utils/dateUtils");

async function validarPorFestivoTipo1(anio, mes, dia) {
  const festivos = await festivoService.buscarPorDiaMesTipo1(dia, mes);
  return festivos.length > 0;
}

async function validarPorFestivoTipo2(anio, mes, dia) {
  const consulta = dateUTC(anio, mes, dia);
  const festivosTipo2 = await festivoService.buscarPorTipo(2);

  for (const festivo of festivosTipo2) {
    const siguienteLunes = getNextMonday(anio, festivo.mes, festivo.dia);
    if (isSameDate(consulta, siguienteLunes)) {
      return true;
    }
  }

  return false;
}

async function validarPorFestivoTipo3(anio, mes, dia) {
  const consulta = dateUTC(anio, mes, dia);
  const domingoPascua = getEasterSunday(anio);
  const festivosTipo3 = await festivoService.buscarPorTipo(3);

  for (const festivo of festivosTipo3) {
    const fechaFestivo = addDays(domingoPascua, festivo.diasPascua);
    if (isSameDate(consulta, fechaFestivo)) {
      return true;
    }
  }

  return false;
}

async function validarPorFestivoTipo4(anio, mes, dia) {
  const consulta = dateUTC(anio, mes, dia);
  const domingoPascua = getEasterSunday(anio);
  const festivosTipo4 = await festivoService.buscarPorTipo(4);

  for (const festivo of festivosTipo4) {
    const fechaBase = addDays(domingoPascua, festivo.diasPascua);
    const fechaFestivo = getNextMonday(
      fechaBase.getUTCFullYear(),
      fechaBase.getUTCMonth() + 1,
      fechaBase.getUTCDate()
    );

    if (isSameDate(consulta, fechaFestivo)) {
      return true;
    }
  }

  return false;
}

async function validarFechaFestivo(anio, mes, dia) {
  if (await validarPorFestivoTipo1(anio, mes, dia)) {
    return true;
  }

  if (await validarPorFestivoTipo2(anio, mes, dia)) {
    return true;
  }

  if (await validarPorFestivoTipo3(anio, mes, dia)) {
    return true;
  }

  return validarPorFestivoTipo4(anio, mes, dia);
}

async function validarSiEsFestivo(anio, mes, dia) {
  return (await validarFechaFestivo(anio, mes, dia))
    ? "Es festivo"
    : "No es festivo";
}

async function validarSiEsFechaValida(anio, mes, dia) {
  if (!isValidDate(anio, mes, dia)) {
    return "Fecha no valida";
  }

  return validarSiEsFestivo(anio, mes, dia);
}

async function obtenerFestivosAnio(anio) {
  const festivos = await festivoService.listar();
  const resultado = [];
  const domingoPascua = getEasterSunday(anio);

  for (const festivo of festivos) {
    let fecha = dateUTC(anio, 1, 1);

    switch (festivo.clasificacionFestivo.id) {
      case 1:
        fecha = dateUTC(anio, festivo.mes, festivo.dia);
        break;
      case 2:
        fecha = getNextMonday(anio, festivo.mes, festivo.dia);
        break;
      case 3: {
        const fechaFestivo = domingoPascua;
        fecha = addDays(fechaFestivo, festivo.diasPascua);
        break;
      }
      case 4: {
        let fechaFestivo = domingoPascua;
        fechaFestivo = addDays(fechaFestivo, festivo.diasPascua);
        fecha = getNextMonday(
          fechaFestivo.getUTCFullYear(),
          fechaFestivo.getUTCMonth() + 1,
          fechaFestivo.getUTCDate()
        );
        break;
      }
      default:
        break;
    }

    resultado.push({
      nombre: festivo.nombre,
      fecha: formatDateISO(fecha)
    });
  }

  return resultado;
}

module.exports = {
  validarSiEsFechaValida,
  obtenerFestivosAnio
};
