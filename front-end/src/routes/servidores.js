var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

// router.get("/:empresaId", function (req, res) {
//   servidorController.buscarServidoresPorEmpresa(req, res);
// });

router.get('/dadosEstaticosServidor', function (req, res) {
  servidorController.getDadosEstaticos(req, res);
});

router.get('/dadosPID', function (req, res) {
  servidorController.getProcessos(req, res);
});

router.get('/dadosDiscos', function (req, res) {
  servidorController.getDadosDiscos(req, res);
});

router.get('/dadosCPUeRAM', function (req, res) {
  servidorController.getDadosCPUeRAM(req, res);
});

router.get('/dadosRede', function (req, res) {
  servidorController.getDadosRede(req, res);
});


module.exports = router;