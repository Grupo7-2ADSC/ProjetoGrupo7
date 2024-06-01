var express = require("express");
var router = express.Router();
var empresaController = require("../controllers/empresaController");

router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
});

router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

router.get("/buscar/:id", function (req, res) {
    empresaController.buscarPorId(req, res);
});

router.get("/listarEmpresas", function (req, res) {
    empresaController.listarEmpresasAdm(req, res);
});

router.put("/editar/:id", function (req, res) {
    var id = req.params.id;
    var nome = req.body.nome; // Dados a serem atualizados, vindo do corpo da requisição
    var cnpj = req.body.cnpj;
    // Adicione outros campos que você deseja editar

    empresaController.editarEmpresa(id, nome, cnpj)
        .then(resultado => {
            res.status(200).json({ mensagem: "Empresa editada com sucesso!" });
        })
        .catch(erro => {
            console.log("Erro ao editar empresa:", erro);
            res.status(500).json({ erro: "Erro interno ao editar empresa" });
        });
});

// Rota para deletar uma empresa
router.delete("/deletar/:id", function (req, res) {
    var id = req.params.id;

    empresaController.deletarEmpresa(id)
        .then(resultado => {
            res.status(200).json({ mensagem: "Empresa deletada com sucesso!" });
        })
        .catch(erro => {
            console.log("Erro ao deletar empresa:", erro);
            res.status(500).json({ erro: "Erro interno ao deletar empresa" });
        });
});


module.exports = router;