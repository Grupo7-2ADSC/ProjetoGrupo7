var database = require("../database/config");
const { cadastrar } = require("./usuarioModel");

function listarEmpresas() {
    var query = `SELECT * FROM Empresa;`;
    return database.executar(query);
}


function editar(id, nome, cnpj) {
    var query = `UPDATE Empresa SET nome = ?, cnpj = ? WHERE id_empresa = ?;`;
    return database.executar(query, [nome, cnpj, id]);
}

function deletar(id) {
    var query = `DELETE FROM Empresa WHERE id_empresa = ?;`;
    return database.executar(query, [id]);
}

function listarAcessos() {
    var query = `SELECT * FROM TipoAcesso;`;
    return database.executar(query);
}

function cadastrarAcesso(nome, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj);
  
    var query = `
    INSERT INTO TipoAcesso (tipo) VALUES (?);
    `;
  
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query, [nome]);
  } 

function editarAcesso(id, nome) {
    var query = `UPDATE TipoAcesso SET tipo = ? WHERE id_tipo_acesso = ?;`;
    return database.executar(query, [nome, id]);
}

function deletarAcesso(id) {
    var query = `DELETE FROM TipoAcesso WHERE id_tipo_acesso = ?;`;
    return database.executar(query, [id]);
}

module.exports = {
    listarEmpresas,
    editar,
    deletar,
    listarAcessos,
    editarAcesso,
    deletarAcesso,
    cadastrarAcesso,

};

// function buscarPorId(id) {
//   var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

//   return database.executar(instrucaoSql);
// }
// function buscarPorCnpj(cnpj) {
//   var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

//   return database.executar(instrucaoSql);
// }

// function cadastrar(razaoSocial, cnpj) {
//   var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

//   return database.executar(instrucaoSql);
// }

// module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listarEmpresas };
