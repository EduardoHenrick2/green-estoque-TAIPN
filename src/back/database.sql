-- Etapa 1 — Banco de dados
-- Atividade 1.1 — Criar o banco
CREATE DATABASE IF NOT EXISTS green_estoque;
USE green_estoque;

-- Atividade 1.2 — Criar tabelas base

CREATE TABLE perfis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE fornecedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cnpj VARCHAR(20) UNIQUE,
    contato VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Atividade 1.3 — Criar tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    perfil_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (perfil_id) REFERENCES perfis(id) ON DELETE RESTRICT
);

-- Atividade 1.4 — Criar tabela de produtos (Atualizada para a Etapa 6)
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    marca VARCHAR(100),
    potencia_w INT,
    dimensoes VARCHAR(100),
    preco_compra DECIMAL(10,2),
    preco_venda DECIMAL(10,2),
    quantidade_atual INT DEFAULT 0,
    quantidade_minima INT DEFAULT 5,
    validade DATE,
    imagem_url VARCHAR(255),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT
);

-- Atividade 1.5 — Criar relacionamento produto-fornecedor
CREATE TABLE produto_fornecedor (
    produto_id INT NOT NULL,
    fornecedor_id INT NOT NULL,
    PRIMARY KEY (produto_id, fornecedor_id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id) ON DELETE CASCADE
);

-- Atividade 1.6 — Criar movimentações (Atualizada para Etapa 7)
CREATE TABLE movimentacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    fornecedor_id INT,
    tipo ENUM('ENTRADA', 'SAIDA', 'RETORNO', 'AJUSTE') NOT NULL,
    status VARCHAR(50) NOT NULL,
    observacao TEXT,
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id) ON DELETE SET NULL
);

CREATE TABLE movimentacao_itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movimentacao_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2),
    FOREIGN KEY (movimentacao_id) REFERENCES movimentacoes(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE RESTRICT
);

-- Atividade 1.7 — Criar notificações
CREATE TABLE notificacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('ESTOQUE_BAIXO', 'SEM_ESTOQUE', 'PEDIDO_ENTREGUE', 'AVISO_SISTEMA') NOT NULL,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Atividade 1.8 — Inserir dados iniciais

-- Inserindo Perfis
INSERT INTO perfis (nome) VALUES 
('ADMINISTRADOR'), 
('GESTOR'), 
('OPERACIONAL');

-- Inserindo Categorias
INSERT INTO categorias (nome, descricao) VALUES 
('Placa Solar', 'Módulos fotovoltaicos'), 
('Inversor', 'Inversores de frequência e tensão'), 
('Cabo', 'Cabeamento para energia solar'), 
('Ferramenta', 'Ferramentas diversas de instalação'), 
('Estrutura', 'Estruturas de fixação metálica');

-- Inserindo Usuário admin inicial
-- A senha 'admin123' em bcrypt: $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW
INSERT INTO usuarios (perfil_id, nome, email, senha_hash) VALUES 
((SELECT id FROM perfis WHERE nome = 'ADMINISTRADOR'), 'Admin Sistema', 'admin@greenvolt.com.br', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW');
