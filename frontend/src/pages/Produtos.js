import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', descricao: '', preco: 0, codigo_barras: '' });

  useEffect(() => { fetchList(); }, []);

  function fetchList() {
    axios.get(`${API}/produtos`).then(r => setProdutos(r.data)).catch(console.error);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(`${API}/produtos`, form).then(() => { setForm({ nome: '', descricao: '', preco: 0, codigo_barras: '' }); fetchList(); });
  }

  function remove(id) {
    axios.delete(`${API}/produtos/${id}`).then(fetchList);
  }

  return (
    <div>
      <h3>Produtos</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} required />
        <input placeholder="Descrição" value={form.descricao} onChange={e=>setForm({...form, descricao:e.target.value})} />
        <input type="number" placeholder="Preço" value={form.preco} onChange={e=>setForm({...form, preco:parseFloat(e.target.value)})} required />
        <input placeholder="Código de barras" value={form.codigo_barras} onChange={e=>setForm({...form, codigo_barras:e.target.value})} />
        <button type="submit">Adicionar</button>
      </form>

      <table border="1" cellPadding="6" style={{ marginTop: 10 }}>
        <thead><tr><th>ID</th><th>Nome</th><th>Preço</th><th>Ações</th></tr></thead>
        <tbody>
          {produtos.map(p=> (
            <tr key={p.id}><td>{p.id}</td><td>{p.nome}</td><td>{p.preco}</td><td><button onClick={()=>remove(p.id)}>Remover</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
