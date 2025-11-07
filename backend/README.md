# Backend - Projeto Integrador (FACULDADE GRAN)

Stack: Node.js + Express + SQLite (local)

Como rodar localmente:

```bash
cd backend
npm install
npm run dev   # ou npm start
```

APIs:
- GET /api/produtos
- POST /api/produtos
- GET /api/produtos/:id
- PUT /api/produtos/:id
- DELETE /api/produtos/:id

- GET /api/fornecedores
- POST /api/fornecedores
- GET /api/fornecedores/:id
- PUT /api/fornecedores/:id
- DELETE /api/fornecedores/:id

- POST /api/associacoes  { produto_id, fornecedor_id }
- DELETE /api/associacoes  { produto_id, fornecedor_id }
- GET /api/associacoes/produto/:produto_id
- GET /api/associacoes/fornecedor/:fornecedor_id

Recomendações de deploy: Render, Railway ou Heroku.
