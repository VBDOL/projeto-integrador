const express = require('express');
const router = express.Router();
const controller = require('../controllers/associacaoController');

router.post('/', controller.associar);
router.delete('/', controller.desassociar);

router.get('/produto/:produto_id', controller.fornecedoresPorProduto);
router.get('/fornecedor/:fornecedor_id', controller.produtosPorFornecedor);

module.exports = router;
