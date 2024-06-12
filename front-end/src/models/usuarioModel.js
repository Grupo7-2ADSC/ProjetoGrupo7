var database = require("../database/config");

function autenticar(email, senha) {
  console.log("ACESSEI O MODEL DE USUARIO \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);

  var query = `
  SELECT Usuario.id_usuario, Usuario.nome, Usuario.email, TipoAcesso.tipo AS tipoAcesso, Usuario.fk_empresa AS empresaId
  FROM Usuario 
  JOIN TipoAcesso ON Usuario.fk_tipo_acesso = TipoAcesso.id_tipo_acesso
  WHERE email = ? AND senha = ?;
  `;

  console.log("Executando a instrução SQL: \n" + query);
  return database.executar(query, [email, senha]);
}


function cadastrarEmp(nome, cnpj) {
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

  function editarUserAdm(id, nome, email, senha, tipoAcesso) {
    var query = `UPDATE Usuario SET nome = ?, email = ?, senha = ?, fk_tipo_acesso = ? WHERE id_usuario = ?;`;
    return database.executar(query, [nome, email, senha, tipoAcesso, id]);
}

function deletarUserAdm(id) {
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
  

  // tela interna servidores

  function cadastrarUsuarioInterno(nome, email, senha, acessoId, empresaId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, senha, fk_tipo_acesso, fk_empresa) VALUES (?, ?, ?, ?, ?);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [nome, email, senha, acessoId, empresaId]);
}

function listarUsuariosPorEmpresa(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
       SELECT Usuario.id_usuario, Usuario.nome, Usuario.email, TipoAcesso.tipo AS tipo_acesso 
       FROM Usuario JOIN TipoAcesso 
       ON Usuario.fk_tipo_acesso = TipoAcesso.id_tipo_acesso 
       WHERE fk_empresa = ${idEmpresa}; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarUserIntern(nomeUsuario) {
    var instrucaoSql = `
        DELETE FROM Usuario WHERE nome = '${nomeUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    autenticar,
    cadastrarEmp,
    listarUsuarios,
    editarUserAdm,
    deletarUserAdm,
    cadastrarUsuario,
    cadastrarUsuarioInterno,
    listarUsuariosPorEmpresa,
    deletarUserIntern,

  };
