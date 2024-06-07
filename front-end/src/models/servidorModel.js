const { query } = require("express");
var database = require("../database/config");
const { get } = require("../routes/servidores");

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
};

function getTopProcessos() {
    const query = `
        SELECT pr1.id_processo, pr1.pid, pr1.nome, pr1.uso_cpu, pr1.uso_memoria, pr1.data_registro, pr1.fk_servidor
        FROM ProcessoRegistro pr1
        JOIN (
                SELECT nome, MAX(uso_cpu) AS max_uso_cpu
                FROM ProcessoRegistro
                GROUP BY nome
                ORDER BY max_uso_cpu DESC
                LIMIT 5
        ) pr2 ON pr1.nome = pr2.nome AND pr1.uso_cpu = pr2.max_uso_cpu
        ORDER BY pr1.uso_cpu DESC, pr1.uso_memoria DESC;
    `;
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
};

module.exports = {
    getDadosEstaticosServidor,
    getTopProcessos
}

