var database = require("../database/config");

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


module.exports = {
    listarEmpresas,
    editar,
    deletar,

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
