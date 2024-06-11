var servidorModel = require("../models/servidorModel");

function buscarServidoresPorEmpresa(req, res) {
  var idUsuario = req.params.idUsuario;

  servidorModel.buscarServidoresPorEmpresa(idUsuario)
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
  servidorModel.getDadosEstaticosServidor().then((resultado) => {
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
    servidorModel.getTopProcessos()
    .then(resultado => {
        res.json(resultado);
    })
    .catch(erro => {
        console.log("Erro ao listar Usuarios:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
};


function getDadosDiscos(req, res) {
    servidorModel.getDadosDiscos()
    .then(resultado => {
        res.json(resultado);
    })
    .catch(erro => {
        console.log("Erro ao pegar discos do sistema:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
};

function getDadosCPUeRAM(req, res) {
    servidorModel.getDadosCPUeRAM()
    .then(resultado => {
        res.json(resultado);
    })
    .catch(erro => {
        console.log("Erro ao pegar dados de cpu e ram do sistema:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getDadosRede(req, res) {
    servidorModel.getDadosRede()
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

  
  
}