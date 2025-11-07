// database.js - SQLite simples
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'data', 'estoque.db');

const fs = require('fs');
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Tabela produtos
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    codigo_barras TEXT UNIQUE
  )`);

  // Tabela fornecedores
  db.run(`CREATE TABLE IF NOT EXISTS fornecedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cnpj TEXT UNIQUE,
    endereco TEXT,
    contato TEXT
  )`);

  // Tabela de associação (many-to-many)
  db.run(`CREATE TABLE IF NOT EXISTS produto_fornecedor (
    produto_id INTEGER NOT NULL,
    fornecedor_id INTEGER NOT NULL,
    PRIMARY KEY (produto_id, fornecedor_id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id) ON DELETE CASCADE
  )`);
});

module.exports = db;
