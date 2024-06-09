DROP DATABASE IF EXISTS sentinel_system;

CREATE DATABASE IF NOT EXISTS sentinel_system;

USE sentinel_system;

-- TABELAS

-- EMPRESA

CREATE TABLE Empresa (
id_empresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(16) NOT NULL UNIQUE,
nome VARCHAR(45) NOT NULL,
data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ACESSO

CREATE TABLE TipoAcesso (
id_tipo_acesso INT PRIMARY KEY AUTO_INCREMENT,
tipo VARCHAR(45) NOT NULL
);

-- USUÁRIO

CREATE TABLE Usuario (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
email  VARCHAR(200)  NOT NULL UNIQUE,
senha CHAR(8) NOT NULL,
data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_tipo_acesso INT NOT NULL, 
CONSTRAINT fk_tipo_acesso FOREIGN KEY (fk_tipo_acesso) 
	REFERENCES TipoAcesso (id_tipo_acesso),
fk_empresa INT NOT NULL, 
CONSTRAINT fk_empresa_Usuario FOREIGN KEY (fk_empresa) 
	REFERENCES Empresa (id_empresa) ON DELETE CASCADE
);

-- TIPO COMPONENTE
CREATE TABLE TipoComponente (
id_tipo_componente INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipo VARCHAR(45) NOT NULL
);

-- CONFIGURAÇÃO DE ALERTAS

CREATE TABLE ConfiguracaoAlerta (
id_configuracao INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
parametro_min DECIMAL(5,2) NOT NULL,
parametro_max DECIMAL(5,2) NOT NULL,
fk_tipo_componente INT NOT NULL,
CONSTRAINT fk_tipo_componente_configuracao FOREIGN KEY (fk_tipo_componente)
	REFERENCES TipoComponente (id_tipo_componente),
fk_empresa INT NOT NULL,
CONSTRAINT fk_empresa_configuracao FOREIGN KEY (fk_empresa)
	REFERENCES Empresa (id_empresa) ON DELETE CASCADE
);

-- SERVIDOR

CREATE TABLE Servidor (
id_servidor INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
host_name VARCHAR(45) NOT NULL,
data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
fk_empresa INT, 
CONSTRAINT fk_empresa_servidor FOREIGN KEY (fk_empresa) 
	REFERENCES empresa (id_empresa) ON DELETE CASCADE
);

CREATE TABLE Componente (
id_componente INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(60),
total_gib DECIMAL(10,2),
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_tipo_componente INT NOT NULL,
CONSTRAINT fk_tipo_componente FOREIGN KEY (fk_tipo_componente)
	REFERENCES TipoComponente (id_tipo_componente),
fk_servidor INT NOT NULL,
CONSTRAINT fk_servidor_componente FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor) ON DELETE CASCADE
);

-- HISTÓRICO DE ALERTAS
CREATE TABLE Alerta (
id_alerta INT PRIMARY KEY NOT NULL,
registro DECIMAL(10,2) NOT NULL,
data_registro DATETIME NOT NULL,
fk_componente INT NOT NULL,
CONSTRAINT fk_componente_alerta FOREIGN KEY (fk_componente)
	REFERENCES Componente (id_componente) ON DELETE CASCADE
);

-- COMPONENTES E SISTEMA

CREATE TABLE SistemaOperacionalRegistro (
id_sistema INT PRIMARY KEY AUTO_INCREMENT,
data_inicializacao DATE NOT NULL,
tempo_atividade VARCHAR(50) NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_servidor INT NOT NULL,
CONSTRAINT fk_servidor_sistema FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor) ON DELETE CASCADE
);

CREATE TABLE Registro (
id_registro INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
uso DECIMAL(10,2) NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_componente INT NOT NULL,
CONSTRAINT fk_componente FOREIGN KEY (fk_componente)
	REFERENCES componente (id_componente) ON DELETE CASCADE
);

CREATE TABLE ProcessoRegistro (
id_processo INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
pid INT NOT NULL,
nome VARCHAR(45) NOT NULL,
uso_cpu DECIMAL(10,2) NOT NULL,
uso_memoria DECIMAL (10,2) NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_servidor INT NOT NULL,
CONSTRAINT fk_servidor_processo FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor) ON DELETE CASCADE
);

CREATE TABLE RedeRegistro (
id_rede INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
endereco_ipv4 VARCHAR(45) NOT NULL,
endereco_ipv6 VARCHAR(255) NOT NULL,
bytes_recebidos DECIMAL(10,2) NOT NULL,
bytes_enviados DECIMAL(10,2) NOT NULL,
pacotes_recebidos INT NOT NULL,
pacotes_enviados INT NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_servidor INT NOT NULL,
CONSTRAINT fk_Servidor_rede FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor) ON DELETE CASCADE
);

-- INSERTS

INSERT INTO Empresa (cnpj, nome) VALUES
	(1234567890123456, "Sentinel Sys");
    
INSERT INTO Servidor (nome, host_name, fk_empresa) VALUES
	( "Servidor de Backup", "SAMSUNGBOOK", 1);
    
INSERT INTO TipoComponente (tipo) VALUES
	("CPU"),
    ("MEMORIA"),
    ("DISCO");
    
    INSERT INTO TipoAcesso (tipo) VALUES ('ADM'), ('Representante'), ('Gestor de infra'), ('Usuario padrão/Funcionario');

INSERT INTO Usuario (nome, email, senha, fk_tipo_acesso, fk_empresa) 
VALUES ('Admin User', 'admin@gmail.com', 'admin123', 1, 1);


SELECT 
    c.id_componente,
    c.nome AS nome_componente,
    c.total_gib,
    r.uso AS uso,
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
    c.fk_servidor = 2;
    
-- SELECTS
use sentinel_system;
SELECT * FROM Empresa;
SELECT * FROM Usuario;
SELECT * FROM TipoAcesso;
SELECT * FROM TipoComponente;
SELECT * FROM ConfiguracaoAlerta;
SELECT * FROM Alerta;
SELECT * FROM Servidor;
SELECT * FROM SistemaOperacionalRegistro;
SELECT * FROM ProcessoRegistro;
SELECT * FROM RedeRegistro;
SELECT * FROM Componente;
SELECT * FROM Registro;

INSERT INTO Componente (nome, total_gib, fk_tipo_componente, fk_servidor) 
VALUES ('SSD Nvme M7 de Yasuo (F:)', 230.3, 3, 2);


SELECT *
FROM Registro 
WHERE fk_componente = 3
ORDER BY data_registro DESC
LIMIT 1;



SELECT Usuario.id_usuario, Usuario.nome, Usuario.email, TipoAcesso.tipo AS tipoAcesso, Empresa.nome AS empresa
    FROM Usuario 
    JOIN TipoAcesso ON Usuario.fk_tipo_acesso = TipoAcesso.id_tipo_acesso
    JOIN Empresa ON Usuario.fk_empresa = Empresa.id_empresa 
    WHERE email = '' AND senha = '';
    
    SELECT Usuario.id_usuario, Usuario.nome, Usuario.email, Usuario.senha TipoAcesso.tipo AS tipoAcesso, Empresa.nome AS empresa
    FROM Usuario 
    JOIN TipoAcesso ON Usuario.fk_tipo_acesso = TipoAcesso.id_tipo_acesso
    JOIN Empresa ON Usuario.fk_empresa = Empresa.id_empresa 
    WHERE email = '' AND senha = '';

-- 'admin@gmail.com', 'admin123'


SELECT 
    Usuario.id_usuario, 
    Usuario.nome, 
    Usuario.email, 
    TipoAcesso.tipo AS tipoAcesso, 
    Empresa.nome AS empresa
FROM 
    Usuario 
JOIN 
    TipoAcesso ON Usuario.fk_tipo_acesso = TipoAcesso.id_tipo_acesso
JOIN 
    Empresa ON Usuario.fk_empresa = Empresa.id_empresa;
    
    SELECT 
    Usuario.id_usuario, 
    Usuario.nome, 
    Usuario.email, 
    Usuario.senha, 
    Usuario.data_cadastro,
    TipoAcesso.id_tipo_acesso,
    TipoAcesso.tipo AS tipoAcesso, 
    Empresa.nome AS empresa
FROM 
    Usuario 
JOIN 
    TipoAcesso ON Usuario.fk_tipo_acesso = TipoAcesso.id_tipo_acesso
JOIN 
    Empresa ON Usuario.fk_empresa = Empresa.id_empresa;
    
    UPDATE Usuario SET nome = 'Admin User Teste', email = 'admin@gmail.com', senha = 'admin121', fk_tipo_acesso = '1' WHERE id_usuario = '1';
   
    
    SELECT id_tipo_acesso, tipo FROM TipoAcesso;
    
    SELECT id_empresa, cnpj, nome, DATE_FORMAT(Empresa.data_cadastro, '%d/%m/%Y %H:%i') AS dataFormatada FROM Empresa;
    
   SELECT 
    s.nome AS nome_servidor,
    c_cpu.nome AS nome_cpu,
    c_mem.total_gib AS total_memoria_ram,
    DATE_FORMAT(sr.data_inicializacao, '%d/%m/%Y %H:%i') AS data_inicializacao_sistema,
    DATE_FORMAT(sr.tempo_atividade, '%d/%m/%Y %H:%i') AS tempo_atividade_sistema,
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

SELECT 
    c.id_componente,
    c.nome AS nome_componente,
    c.total_gib,
    r.uso AS uso,
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
    c.fk_servidor = 2;
    
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
    
    SELECT 
    c_cpu.id_componente AS id_cpu,
    c_cpu.nome AS nome_cpu,
    r_cpu.uso AS uso_cpu,
    c_ram.id_componente AS id_ram,
    c_ram.nome AS nome_ram,
    r_ram.uso AS uso_ram
FROM 
    Servidor s
JOIN 
    Componente c_cpu ON s.id_servidor = c_cpu.fk_servidor
JOIN 
    TipoComponente tc_cpu ON c_cpu.fk_tipo_componente = tc_cpu.id_tipo_componente AND tc_cpu.tipo = 'CPU'
JOIN 
    (SELECT fk_componente, uso FROM Registro r WHERE r.fk_componente IN (SELECT id_componente FROM Componente WHERE fk_tipo_componente = (SELECT id_tipo_componente FROM TipoComponente WHERE tipo = 'CPU')) ORDER BY data_registro DESC LIMIT 1) r_cpu ON c_cpu.id_componente = r_cpu.fk_componente
JOIN 
    Componente c_ram ON s.id_servidor = c_ram.fk_servidor
JOIN 
    TipoComponente tc_ram ON c_ram.fk_tipo_componente = tc_ram.id_tipo_componente AND tc_ram.tipo = 'MEMORIA'
JOIN 
    (SELECT fk_componente, uso FROM Registro r WHERE r.fk_componente IN (SELECT id_componente FROM Componente WHERE fk_tipo_componente = (SELECT id_tipo_componente FROM TipoComponente WHERE tipo = 'MEMORIA')) ORDER BY data_registro DESC LIMIT 1) r_ram ON c_ram.id_componente = r_ram.fk_componente
WHERE 
    s.id_servidor = 2;
    
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
LIMIT 1;
    