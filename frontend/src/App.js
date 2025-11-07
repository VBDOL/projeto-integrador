import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Produtos from './pages/Produtos';
import Fornecedores from './pages/Fornecedores';
import Associacoes from './pages/Associacoes';

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>Projeto Integrador - FACULDADE GRAN</h2>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Produtos</Link>
        <Link to="/fornecedores" style={{ marginRight: 10 }}>Fornecedores</Link>
        <Link to="/associacoes">Associações</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Produtos />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/associacoes" element={<Associacoes />} />
      </Routes>
    </div>
  );
}
