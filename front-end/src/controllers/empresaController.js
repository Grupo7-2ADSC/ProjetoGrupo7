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
  return empresaModel.editar(id, nome, cnpj);
}

function deletarEmpresa(id) {
  return empresaModel.deletar(id);
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
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
};
