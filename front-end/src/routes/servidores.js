var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.get("/:empresaId", function (req, res) {
  servidorController.buscarServidoresPorEmpresa(req, res);
});

router.get('/dadosEstaticosServidor/:idServidor', function (req, res) {
  servidorController.getDadosEstaticos(req, res);
});

router.get('/dadosPID/:idServidor', function (req, res) {
  servidorController.getProcessos(req, res);
});

router.get('/dadosDiscos/:idServidor', function (req, res) {
  servidorController.getDadosDiscos(req, res);
});

router.get('/dadosCPUeRAM/:idServidor', function (req, res) {
  servidorController.getDadosCPUeRAM(req, res);
});

router.get('/dadosRede/:idServidor', function (req, res) {
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

});

router.post('/cadastrarServidor', function (req, res) {
  servidorController.cadastrarServidor(req, res);
});

router.get('/obterServidoresPorEmpresa/:idEmpresa', function (req, res) {
  servidorController.obterServidoresPorEmpresa(req, res);
});

router.delete('/excluirServidor/:idServidor', function (req, res) {
servidorController.excluirServidor(req, res);

});

router.put('/alterarServidor/:idServidor', function (req, res) {
  servidorController.alterarServidor(req, res);
});

router.post('/enviarAlertas', function (req, res) {
  servidorController.enviarAlertas(req, res);
});


module.exports = router;