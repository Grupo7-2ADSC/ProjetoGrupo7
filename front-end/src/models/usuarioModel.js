var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O MODEL DE USUARIO \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);

    var query = `
    SELECT Usuario.id_usuario, Usuario.nome, Usuario.email, TipoAcesso.tipo AS tipoAcesso, Empresa.nome AS empresa
    FROM Usuario 
    JOIN TipoAcesso ON Usuario.fk_tipo_acesso = TipoAcesso.id_tipo_acesso
    JOIN Empresa ON Usuario.fk_empresa = Empresa.id_empresa 
    WHERE email = ? AND senha = ?;
  `;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query, [email, senha]);
}

function cadastrar(nome, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj);
  
    var query = `
      INSERT INTO Empresa (nome, cnpj) VALUES (?, ?);
    `;
  
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query, [nome, cnpj]);
  } 

  function listarUsuarios() {
    var query = `   
    SELECT 
    Usuario.id_usuario, 
    Usuario.nome, 
    Usuario.email, 
    Usuario.senha, 
    DATE_FORMAT(Usuario.data_cadastro, '%d/%m/%Y %H:%i') AS data_cadastro,
    TipoAcesso.id_tipo_acesso,
    TipoAcesso.tipo AS tipoAcesso, 
    Empresa.nome AS empresa
FROM 
    Usuario 
JOIN 
    TipoAcesso ON Usuario.fk_tipo_acesso = TipoAcesso.id_tipo_acesso
JOIN 
    Empresa ON Usuario.fk_empresa = Empresa.id_empresa;`;
    return database.executar(query);
}

  function editar(id, nome, email, senha, tipoAcesso) {
    var query = `UPDATE Usuario SET nome = ?, email = ?, senha = ?, fk_tipo_acesso = ? WHERE id_usuario = ?;`;
    return database.executar(query, [nome, email, senha, tipoAcesso, id]);
}

function deletar(id) {
    var query = `DELETE FROM Usuario WHERE id_usuario = ?;`;
    return database.executar(query, [id]);
}
function cadastrarUsuario(nome, email, senha, empresa, tipoAcesso){

  var query = `
  INSERT INTO Usuario (nome, email, senha, fk_tipo_acesso, fk_empresa) 
  VALUES (?, ?, ?, ?, ?);
    `;
  
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query, [nome,  email, senha, tipoAcesso, empresa]);
  } 

module.exports = {
    autenticar,
    cadastrar,
    listarUsuarios,
    editar,
    deletar,
    cadastrarUsuario,
  };
