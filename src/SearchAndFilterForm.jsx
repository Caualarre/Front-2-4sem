// src/SearchAndFilterForm.jsx
import React from 'react';

function SearchAndFilterForm() {
  return (
    <div className="search-filter-container">
      <form className="search-form">
        <label htmlFor="nome">Pesquisar VTuber:</label>
        <input type="text" id="nome" placeholder="Digite o nome da VTuber" />
        <button type="submit">Pesquisar</button>
      </form>

      <form className="filter-form">
        <label htmlFor="filtro">Ordenar por:</label>
        <select id="filtro">
          <option value="recentes">Mais Recentes</option>
          <option value="maior_nota">Maior Nota</option>
          <option value="mais_avaliacoes">Mais Avaliações</option>
        </select>
        <button type="submit">Filtrar</button>
      </form>
    </div>
  );
}

export default SearchAndFilterForm;
