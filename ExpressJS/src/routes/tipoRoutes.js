const express = require("express");
const controller = require("../controllers/tipoController");

const router = express.Router();

router.get("/listar", controller.listar);
router.get("/obtener/:id", controller.obtener);
router.post("/agregar", controller.agregar);
router.put("/modificar/:id", controller.modificar);
router.delete("/eliminar/:id", controller.eliminar);
router.get("/buscar", controller.buscar);

module.exports = router;
