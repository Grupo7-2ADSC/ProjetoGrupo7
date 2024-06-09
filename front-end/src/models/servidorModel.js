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

getDadosDiscos = function () {
    const query = `
         SELECT 
    c.id_componente,
    c.nome AS nome_componente,
    c.total_gib,
    MAX(r.uso) AS uso,
    c.data_registro,
    c.fk_servidor
FROM 
    Componente c
JOIN 
    TipoComponente tc ON c.fk_tipo_componente = tc.id_tipo_componente
LEFT JOIN 
    Registro r ON c.id_componente = r.fk_componente
WHERE 
    tc.tipo = 'DISCO' AND
    c.fk_servidor = 2
GROUP BY 
    c.id_componente, c.nome, c.total_gib, c.data_registro, c.fk_servidor;
    `;
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
};


getDadosCPUeRAM = function () {
    const query = `
   SELECT 
    c_cpu.id_componente AS id_cpu,
    c_cpu.nome AS nome_cpu,
    r_cpu.uso AS uso_cpu,
    c_ram.id_componente AS id_ram,
    r_ram.uso AS uso_ram
FROM 
    Servidor s
JOIN 
    Componente c_cpu ON s.id_servidor = c_cpu.fk_servidor
JOIN 
    TipoComponente tc_cpu ON c_cpu.fk_tipo_componente = tc_cpu.id_tipo_componente AND tc_cpu.tipo = 'CPU'
JOIN 
    (SELECT fk_componente, uso FROM Registro WHERE fk_componente IN (SELECT id_componente FROM Componente WHERE fk_tipo_componente = (SELECT id_tipo_componente FROM TipoComponente WHERE tipo = 'CPU')) ORDER BY data_registro DESC LIMIT 1) r_cpu ON c_cpu.id_componente = r_cpu.fk_componente
JOIN 
    Componente c_ram ON s.id_servidor = c_ram.fk_servidor
JOIN 
    TipoComponente tc_ram ON c_ram.fk_tipo_componente = tc_ram.id_tipo_componente AND tc_ram.tipo = 'MEMORIA'
JOIN 
    (SELECT fk_componente, uso FROM Registro WHERE fk_componente IN (SELECT id_componente FROM Componente WHERE fk_tipo_componente = (SELECT id_tipo_componente FROM TipoComponente WHERE tipo = 'MEMORIA')) ORDER BY data_registro DESC LIMIT 1) r_ram ON c_ram.id_componente = r_ram.fk_componente
WHERE 
    s.id_servidor = 2;
    `

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);

};

getDadosRede = function () {
    const query = `
    SELECT 
    id_rede, 
    bytes_recebidos, 
    bytes_enviados, 
    pacotes_recebidos, 
    pacotes_enviados, 
    data_registro 
FROM 
    RedeRegistro 
WHERE 
    fk_servidor = 2
ORDER BY 
    data_registro DESC 
LIMIT 1;`

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);

};

module.exports = {
    getDadosEstaticosServidor,
    getTopProcessos,
    getDadosDiscos,
    getDadosCPUeRAM,
    getDadosRede,
    
}

