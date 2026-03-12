const express = require("express");
const controller = require("../controllers/validacionController");

const router = express.Router();

router.get("/verificar/:anio/:mes/:dia", controller.verificar);
router.get("/obtener/:anio", controller.obtener);

module.exports = router;
