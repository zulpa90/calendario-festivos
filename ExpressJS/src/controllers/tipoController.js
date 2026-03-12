const tipoService = require("../services/tipoService");

async function listar(req, res, next) {
  try {
    const data = await tipoService.listar();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function obtener(req, res, next) {
  try {
    const id = Number(req.params.id);
    const data = await tipoService.obtener(id);

    if (!data) {
      return res.sendStatus(404);
    }

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
}

async function agregar(req, res, next) {
  try {
    const data = await tipoService.agregar(req.body);
    res.status(201).json(data);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: "Ya existe un tipo con ese nombre" });
    }
    return next(error);
  }
}

async function modificar(req, res, next) {
  try {
    const id = Number(req.params.id);
    const data = await tipoService.modificar(id, req.body);

    if (!data) {
      return res.sendStatus(404);
    }

    return res.status(200).json(data);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: "Ya existe un tipo con ese nombre" });
    }
    return next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    const id = Number(req.params.id);
    const deleted = await tipoService.eliminar(id);

    if (!deleted) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
}

async function buscar(req, res, next) {
  try {
    const nombre = req.query.nombre || "";
    const data = await tipoService.buscar(nombre);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  obtener,
  agregar,
  modificar,
  eliminar,
  buscar
};
