var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});



router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listarUsuarios", function (req, res) {
    usuarioController.listarUsuariosAdm(req, res);
});

router.put("/editar/:id", function (req, res) {
    var id = req.params.id;
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var tipoAcesso = req.body.tipoAcesso;
   

    usuarioController.editarUsuario(id, nome, email, senha, tipoAcesso)
        .then(resultado => {
            res.status(200).json({ mensagem: "usuario editado com sucesso!" });
        })
        .catch(erro => {
            console.log("Erro ao editar usuario:", erro);
            res.status(500).json({ erro: "Erro interno ao editar usuario" });
        });
});

router.delete("/deletar/:id", function (req, res) {
    var id = req.params.id;

    usuarioController.deletarUsuario(id)
        .then(resultado => {
            res.status(200).json({ mensagem: "usuario deletada com sucesso!" });
        })
        .catch(erro => {
            console.log("Erro ao deletar usuario:", erro);
            res.status(500).json({ erro: "Erro interno ao deletar usuario" });
        });
});

router.post("/cadastrarUser", function (req, res) {
    usuarioController.cadastrarUser(req, res);
});

module.exports = router;