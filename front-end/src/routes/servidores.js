var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

// router.get("/:empresaId", function (req, res) {
//   servidorController.buscarServidoresPorEmpresa(req, res);
// });

router.get('/dadosEstaticosServidor', function (req, res) {
  servidorController.getDadosEstaticos(req, res);
});

module.exports = router;