var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}


function listarEmpresasAdm(req, res) {
    empresaModel.listarEmpresas()
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao listar empresas:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


function editarEmpresa(id, nome, cnpj) {
  return empresaModel.editarEmp(id, nome, cnpj);
}

function deletarEmpresa(id) {
  return empresaModel.deletarEmp(id);
}


function listarAcessos(req, res) {
  empresaModel.listarAcessos()
      .then(resultado => {
          res.json(resultado);
      })
      .catch(erro => {
          console.log("Erro ao listar acessos:", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
      });
}


function editarAcesso(id, nome) {
  return empresaModel.editarAcesso(id, nome);
}

function deletarAcesso(id) {
  return empresaModel.deletarAcesso(id);
}

function cadastrarAcesso(req, res) {
  var nome = req.body.nomeServer;

  if (nome === undefined) {
    res.status(400).send("Campo nome está undefined!");
  } else {
    empresaModel.cadastrarAcesso(nome)
      .then(resultado => {
        res.json(resultado);
      })
      .catch(erro => {
        console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}


function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

module.exports = {
  listarEmpresasAdm,
  editarEmpresa,
  deletarEmpresa,
  listarAcessos,
  deletarAcesso,
  editarAcesso,
  cadastrarAcesso,
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
};
