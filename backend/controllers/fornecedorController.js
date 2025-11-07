const db = require('../database');

exports.list = (req, res) => {
  db.all('SELECT * FROM fornecedores', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.get = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM fornecedores WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Fornecedor não encontrado' });
    res.json(row);
  });
};

exports.create = (req, res) => {
  const { nome, cnpj, endereco, contato } = req.body;
  const sql = 'INSERT INTO fornecedores (nome, cnpj, endereco, contato) VALUES (?, ?, ?, ?)';
  db.run(sql, [nome, cnpj, endereco, contato], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM fornecedores WHERE id = ?', [this.lastID], (err, row) => {
      res.status(201).json(row);
    });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { nome, cnpj, endereco, contato } = req.body;
  const sql = 'UPDATE fornecedores SET nome = ?, cnpj = ?, endereco = ?, contato = ? WHERE id = ?';
  db.run(sql, [nome, cnpj, endereco, contato, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
};

exports.remove = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM fornecedores WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};
