const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const produtoRoutes = require('./routes/produtoRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const associacaoRoutes = require('./routes/associacaoRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/produtos', produtoRoutes);
app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/associacoes', associacaoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}/`);
});
