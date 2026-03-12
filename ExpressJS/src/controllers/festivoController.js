const festivoService = require("../services/festivoService");

async function listar(req, res, next) {
  try {
    const data = await festivoService.listar();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function obtener(req, res, next) {
  try {
    const id = Number(req.params.id);
    const data = await festivoService.obtener(id);

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
    const data = await festivoService.agregar(req.body);
    res.status(201).json(data);
  } catch (error) {
    if (error.message === "Tipo no encontrado") {
      return res.status(400).json({ mensaje: error.message });
    }
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: "Ya existe un festivo con ese nombre" });
    }
    return next(error);
  }
}

async function modificar(req, res, next) {
  try {
    const id = Number(req.params.id);
    const data = await festivoService.modificar(id, req.body);

    if (!data) {
      return res.sendStatus(404);
    }

    return res.status(200).json(data);
  } catch (error) {
    if (error.message === "Tipo no encontrado") {
      return res.status(400).json({ mensaje: error.message });
    }
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: "Ya existe un festivo con ese nombre" });
    }
    return next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    const id = Number(req.params.id);
    const deleted = await festivoService.eliminar(id);

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
    const data = await festivoService.buscar(nombre);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function listarPorTipo(req, res, next) {
  try {
    const idTipo = Number(req.params.idTipo);
    const data = await festivoService.buscarPorTipo(idTipo);
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
  buscar,
  listarPorTipo
};
