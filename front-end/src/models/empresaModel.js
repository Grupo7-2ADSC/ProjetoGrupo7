var database = require("../database/config");
const { cadastrar } = require("./usuarioModel");

function listarEmpresas() {
    var query = `   SELECT id_empresa, cnpj, nome, DATE_FORMAT(Empresa.data_cadastro, '%d/%m/%Y %H:%i') AS data_cadastro FROM Empresa;  `;
    return database.executar(query);
}


function editarEmp(id, nome, cnpj) {
    var query = `UPDATE Empresa SET nome = ?, cnpj = ? WHERE id_empresa = ?;`;
    return database.executar(query, [nome, cnpj, id]);
}

function deletarEmp(id) {
    var query = `DELETE FROM Empresa WHERE id_empresa = ?;`;
    return database.executar(query, [id]);
}

function listarAcessos() {
    var query = `SELECT * FROM TipoAcesso;`;
    return database.executar(query);
}

function cadastrarAcesso(nome) {
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
    editarEmp,
    deletarEmp,
    listarAcessos,
    editarAcesso,
    deletarAcesso,
    cadastrarAcesso,

};

