var servidorModel = require("../models/servidorModel");

function buscarServidoresPorEmpresa(req, res) {
  var idEmpresa = req.params.idEmpresa;

  servidorModel.buscarServidoresPorEmpresa(idEmpresa)
  .then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os servidores: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
};

function getDadosEstaticos(req, res) {
  var idServidor = req.params.idServidor;
  servidorModel.getDadosEstaticosServidor(idServidor).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado[0]);
    } else {
      res.status(204).json([]);
    }
  }).catch((erro) => {
    console.log("Houve um erro ao buscar os dados estáticos do servidor: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
};

function getProcessos(req, res) {
  var idServidor = req.params.idServidor;
    servidorModel.getTopProcessos(idServidor)
    .then(resultado => {
        res.json(resultado);
    })
    .catch(erro => {
        console.log("Erro ao listar Usuarios:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
};


function getDadosDiscos(req, res) {
  let idServidor = req.params.idServidor;
    servidorModel.getDadosDiscos(idServidor)
    .then(resultado => {
        res.json(resultado);
    })
    .catch(erro => {
        console.log("Erro ao pegar discos do sistema:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
};

function getDadosCPUeRAM(req, res) {
    let idServidor = req.params.idServidor;
    servidorModel.getDadosCPUeRAM(idServidor)
    .then(resultado => {
        res.json(resultado);
    })
    .catch(erro => {
        console.log("Erro ao pegar dados de cpu e ram do sistema:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getDadosRede(req, res) {
  var idServidor = req.params.idServidor;
    servidorModel.getDadosRede(idServidor)
    .then(resultado => {
        res.json(resultado);
    })
    .catch(erro => {
        console.log("Erro ao pegar dados de rede do sistema:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
};

function inserirParametrosDefault(req, res) {
  const idEmpresa = req.body.idEmpresa;
  servidorModel.inserirParametrosDefault(idEmpresa)
      .then(resultado => {
          res.json(resultado);
      })
      .catch(erro => {
          console.log("Erro ao inserir parametros default:", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
      });
}

function obterParametros(req, res) {
  const idEmpresa = req.params.idEmpresa;
  servidorModel.obterParametrosEmp(idEmpresa)
      .then(resultado => {
          res.json(resultado);
      })
      .catch(erro => {
          console.log("Erro ao obter parametros:", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
      });
}

function getQtdServidoresUsoCompontesElevado(req, res) {
  const idEmpresa = req.params.idEmpresa;
  servidorModel.getQtdServidoresUsoCompontesElevado(idEmpresa)
      .then(resultado => {
          res.json(resultado);
      })
      .catch(erro => {
          console.log("Erro ao obter parametros:", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
      });
}

function cadastrarServidor(req, res) {

    var nome = req.body.nomeServer;
    var hostName = req.body.hostNameServer;
    var idEmpresa = req.body.idEmpresaServer;
  
    if (nome === undefined) {
      res.status(400).send("Campo nome está undefined!");
    } else if (hostName === undefined) {
      res.status(400).send("Campo hostName está undefined!");
    } else {
      servidorModel.cadastrarServidor(nome, hostName, idEmpresa)
        .then(resultado => {
          res.json(resultado);
        })
        .catch(erro => {
          console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        });
    }
  }

  function obterServidoresPorEmpresa(req, res) {
    const idEmpresa = req.params.idEmpresa;
    servidorModel.obterServidoresPorEmpresa(idEmpresa)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao obter servidores:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
  }

  function excluirServidor(req, res) {
    const id = req.params.idServidor;
    servidorModel.excluirServidor(id)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao excluir servidor:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
  }

  function alterarServidor(req, res) {
    const id = req.params.idServidor;
    const nome = req.body.novoNomeServer;
    const hostName = req.body.novoHostServer;
    console.log(id, nome, hostName);
    servidorModel.alterarServidor(id, nome, hostName)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao alterar servidor:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
  }

  function enviarAlertas(req, res) {
    var componente = req.body.componente;
    var registro = req.body.registro;
    var dataRegistro = new Date();

    servidorModel.enviarAlertas(componente, registro, dataRegistro)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao enviar alertas:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = { 
  
  buscarServidoresPorEmpresa,
  getDadosEstaticos,
  getProcessos,
  getDadosDiscos,
  getDadosCPUeRAM,
  getDadosRede,
  inserirParametrosDefault,
  obterParametros,
  getQtdServidoresUsoCompontesElevado,
  cadastrarServidor,
  obterServidoresPorEmpresa,
  excluirServidor,
  alterarServidor,
  enviarAlertas

  
  
}