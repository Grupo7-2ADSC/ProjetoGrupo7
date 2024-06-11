var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.get("/:empresaId", function (req, res) {
  servidorController.buscarServidoresPorEmpresa(req, res);
});

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

router.post('/inserirParametrosDefault', function (req, res) {
  servidorController.inserirParametrosDefault(req, res);
});

router.get('/obterParametros/:idEmpresa', function (req, res) {
  servidorController.obterParametros(req, res);
});

router.get('/getQtdServidoresUsoCompontesElevado/:idEmpresa', function (req, res){
  servidorController.getQtdServidoresUsoCompontesElevado(req, res);

})


module.exports = router;