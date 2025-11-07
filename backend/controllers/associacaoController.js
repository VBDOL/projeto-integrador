const db = require('../database');

exports.associar = (req, res) => {
  const { produto_id, fornecedor_id } = req.body;
  const sql = 'INSERT OR IGNORE INTO produto_fornecedor (produto_id, fornecedor_id) VALUES (?, ?)';
  db.run(sql, [produto_id, fornecedor_id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ produto_id, fornecedor_id });
  });
};

exports.desassociar = (req, res) => {
  const { produto_id, fornecedor_id } = req.body;
  const sql = 'DELETE FROM produto_fornecedor WHERE produto_id = ? AND fornecedor_id = ?';
  db.run(sql, [produto_id, fornecedor_id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};

exports.fornecedoresPorProduto = (req, res) => {
  const { produto_id } = req.params;
  db.all(
    `SELECT f.* FROM fornecedores f
     JOIN produto_fornecedor pf ON f.id = pf.fornecedor_id
     WHERE pf.produto_id = ?`,
    [produto_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

exports.produtosPorFornecedor = (req, res) => {
  const { fornecedor_id } = req.params;
  db.all(
    `SELECT p.* FROM produtos p
     JOIN produto_fornecedor pf ON p.id = pf.produto_id
     WHERE pf.fornecedor_id = ?`,
    [fornecedor_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};
