var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email === undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha === undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(resultadoAutenticar => {
                if (resultadoAutenticar.length === 1) {
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome,
                        tipoAcesso: resultadoAutenticar[0].tipoAcesso,
                        empresa: resultadoAutenticar[0].empresa

                    });
                } else if (resultadoAutenticar.length === 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(erro => {
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
  
    if (nome === undefined) {
      res.status(400).send("Campo nome está undefined!");
    } else if (cnpj === undefined) {
      res.status(400).send("Campo cnpj está undefined!");
    } else {
      usuarioModel.cadastrar(nome, cnpj)
        .then(resultado => {
          res.json(resultado);
        })
        .catch(erro => {
          console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        });
    }
  }

module.exports = {
    autenticar,
    cadastrar
};
