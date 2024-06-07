var servidorModel = require("../models/servidorModel");

// function buscarServidoresPorEmpresa(req, res) {
//   var idUsuario = req.params.idUsuario;

//   servidorModel.buscarServidoresPorEmpresa(idUsuario).then((resultado) => {
//     if (resultado.length > 0) {
//       res.status(200).json(resultado);
//     } else {
//       res.status(204).json([]);
//     }
//   }).catch(function (erro) {
//     console.log(erro);
//     console.log("Houve um erro ao buscar os servidores: ", erro.sqlMessage);
//     res.status(500).json(erro.sqlMessage);
//   });
// };

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



module.exports = { 
  
  // buscarServidoresPorEmpresa,
  getDadosEstaticos,
  getProcessos,
}