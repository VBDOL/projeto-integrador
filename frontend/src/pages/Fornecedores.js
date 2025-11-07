import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [form, setForm] = useState({ nome: '', cnpj: '', endereco: '', contato: '' });

  useEffect(() => { fetchList(); }, []);
  function fetchList() { axios.get(`${API}/fornecedores`).then(r => setFornecedores(r.data)).catch(console.error); }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(`${API}/fornecedores`, form).then(() => { setForm({ nome: '', cnpj: '', endereco: '', contato: '' }); fetchList(); });
  }
  function remove(id) { axios.delete(`${API}/fornecedores/${id}`).then(fetchList); }

  return (
    <div>
      <h3>Fornecedores</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} required />
        <input placeholder="CNPJ" value={form.cnpj} onChange={e=>setForm({...form, cnpj:e.target.value})} />
        <input placeholder="Endereço" value={form.endereco} onChange={e=>setForm({...form, endereco:e.target.value})} />
        <input placeholder="Contato" value={form.contato} onChange={e=>setForm({...form, contato:e.target.value})} />
        <button type="submit">Adicionar</button>
      </form>

      <table border="1" cellPadding="6" style={{ marginTop: 10 }}>
        <thead><tr><th>ID</th><th>Nome</th><th>Ações</th></tr></thead>
        <tbody>
          {fornecedores.map(f=> (
            <tr key={f.id}><td>{f.id}</td><td>{f.nome}</td><td><button onClick={()=>remove(f.id)}>Remover</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
