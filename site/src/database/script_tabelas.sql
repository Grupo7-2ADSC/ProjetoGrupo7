DROP DATABASE IF EXISTS sentinel_system;

CREATE DATABASE IF NOT EXISTS sentinel_system;

USE sentinel_system;

-- EMPRESA

CREATE TABLE Empresa (
id_empresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(16) NOT NULL UNIQUE,
nome VARCHAR(45) NOT NULL,
telefone CHAR(8) NOT NULL,
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
fk_tipo_acesso INT, 
CONSTRAINT fk_tipo_acesso FOREIGN KEY (fk_tipo_acesso) 
	REFERENCES TipoAcesso (id_tipo_acesso),
fk_empresa INT, 
CONSTRAINT fk_Empresa_Usuario FOREIGN KEY (fk_Empresa) 
	REFERENCES Empresa (id_Empresa)
);

-- SERVIDOR

CREATE TABLE Servidor (
id_servidor INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
sistema_operacional VARCHAR (45),
fk_empresa INT, 
CONSTRAINT fk_Empresa_Servidor FOREIGN KEY (fk_Empresa) 
	REFERENCES Empresa (id_Empresa)
);

-- LOGS
CREATE TABLE Log (
id_log INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
tipo VARCHAR(45) NOT NULL,
registro_pico VARCHAR(45) NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_servidor INT NOT NULL,
CONSTRAINT fk_servidor_log FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor)
);

-- COMPONENTES

CREATE TABLE CpuRegistro (
id_cpu INT PRIMARY KEY NOT NULL,
utilizacao INT NOT NULL,
velocidade INT NOT NULL,
processos INT NOT NULL,
temperatura DOUBLE NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_servidor INT NOT NULL,
CONSTRAINT fk_servidor_cpu FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor)
);

CREATE TABLE DiscoRegistro (
id_disco INT PRIMARY KEY NOT NULL,
armazenamento_total INT NOT NULL,
armazenamento_livre INT NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_servidor INT NOT NULL,
CONSTRAINT fk_servidor_disco FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor)
);

CREATE TABLE RamRegistro (
id_ram INT PRIMARY KEY NOT NULL,
armazenamento_total INT NOT NULL,
armazenamento_disponivel INT NOT NULL,
armazenameento_em_uso INT NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_servidor INT NOT NULL,
CONSTRAINT fk_servidor_ram FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor)
);

CREATE TABLE RedeRegistro (
id_rede INT PRIMARY KEY NOT NULL,
pacotes_enviados INT NOT NULL,
pacotes_recebidos INT NOT NULL,
pacotes_perdidos INT NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_servidor INT NOT NULL,
CONSTRAINT fk_Servidor_rede FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor)
);