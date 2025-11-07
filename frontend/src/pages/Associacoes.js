import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export default function Associacoes() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [sel, setSel] = useState({ produto_id: '', fornecedor_id: '' });

  useEffect(() => { axios.get(`${API}/produtos`).then(r=>setProdutos(r.data)); axios.get(`${API}/fornecedores`).then(r=>setFornecedores(r.data)); }, []);

  function associar(e) {
    e.preventDefault();
    axios.post(`${API}/associacoes`, sel).then(()=>{ setSel({ produto_id: '', fornecedor_id: '' }); alert('Associado!'); });
  }

  function verFornecedores(produto_id) {
    axios.get(`${API}/associacoes/produto/${produto_id}`).then(r=>{ alert(JSON.stringify(r.data)); });
  }

  return (
    <div>
      <h3>Associações</h3>
      <form onSubmit={associar}>
        <select value={sel.produto_id} onChange={e=>setSel({...sel, produto_id:e.target.value})} required>
          <option value="">Selecione o produto</option>
          {produtos.map(p=> <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
        <select value={sel.fornecedor_id} onChange={e=>setSel({...sel, fornecedor_id:e.target.value})} required>
          <option value="">Selecione o fornecedor</option>
          {fornecedores.map(f=> <option key={f.id} value={f.id}>{f.nome}</option>)}
        </select>
        <button type="submit">Associar</button>
      </form>

      <h4 style={{ marginTop: 20 }}>Ver fornecedores por produto</h4>
      <ul>
        {produtos.map(p=> (<li key={p.id}>{p.nome} - <button onClick={()=>verFornecedores(p.id)}>Ver fornecedores</button></li>))}
      </ul>
    </div>
  );
}
