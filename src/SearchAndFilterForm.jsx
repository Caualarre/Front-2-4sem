import React, { useState } from 'react';
//import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;


const SearchAndFilterForm = ({ onSearch }) => {
  const [nome, setNome] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [media, setMedia] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const filters = {};

    if (nome) filters.nome = nome;
    if (empresaId) filters.empresa_id = empresaId;
    if (media) filters.media = media;

    onSearch(filters); // Passa os filtros para a função onSearch do App.jsx
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID da Empresa"
        value={empresaId}
        onChange={(e) => setEmpresaId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Média"
        value={media}
        onChange={(e) => setMedia(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchAndFilterForm;

