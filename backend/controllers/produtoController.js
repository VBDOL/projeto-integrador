const db = require('../database');

exports.list = (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.get = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(row);
  });
};

exports.create = (req, res) => {
  const { nome, descricao, preco, codigo_barras } = req.body;
  const sql = 'INSERT INTO produtos (nome, descricao, preco, codigo_barras) VALUES (?, ?, ?, ?)';
  db.run(sql, [nome, descricao, preco, codigo_barras], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM produtos WHERE id = ?', [this.lastID], (err, row) => {
      res.status(201).json(row);
    });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, codigo_barras } = req.body;
  const sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, codigo_barras = ? WHERE id = ?';
  db.run(sql, [nome, descricao, preco, codigo_barras, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
};

exports.remove = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM produtos WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};
