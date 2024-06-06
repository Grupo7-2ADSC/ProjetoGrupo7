const { query } = require("express");
var database = require("../database/config");

// function buscarServidoresPorEmpresa(empresaId) {

//   instrucaoSql = `SELECT * FROM Servidor WHERE fk_empresa = ${empresaId}`;

//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }

function getDadosEstaticosServidor() {
  const query = `  SELECT 
    s.nome AS nome_servidor,
    c_cpu.nome AS nome_cpu,
    c_mem.total_gib AS total_memoria_ram,
    DATE_FORMAT(sr.data_inicializacao, '%d/%m/%Y %H:%i') AS data_inicializacao_sistema,
    rr.endereco_ipv4,
    rr.endereco_ipv6
FROM 
    Servidor s
JOIN 
    Componente c_cpu ON s.id_servidor = c_cpu.fk_servidor
JOIN 
    TipoComponente tc_cpu ON c_cpu.fk_tipo_componente = tc_cpu.id_tipo_componente AND tc_cpu.tipo = 'CPU'
JOIN 
    Componente c_mem ON s.id_servidor = c_mem.fk_servidor
JOIN 
    TipoComponente tc_mem ON c_mem.fk_tipo_componente = tc_mem.id_tipo_componente AND tc_mem.tipo = 'MEMORIA'
JOIN 
    SistemaOperacionalRegistro sr ON s.id_servidor = sr.fk_servidor
LEFT JOIN 
    RedeRegistro rr ON s.id_servidor = rr.fk_servidor
WHERE 
    s.id_servidor = 2;
  `;
  console.log("Executando a instrução SQL: \n" + query);
  return database.executar(query);
}


module.exports = {
  // buscarServidoresPorEmpresa,
  getDadosEstaticosServidor,
}