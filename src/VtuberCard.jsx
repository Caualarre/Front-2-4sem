// src/VtuberCard.jsx
import React from 'react';

function VtuberCard({ vtuber }) {
  return (
    <div className="vtuber-card">
      <img
        src={`assets/images/${vtuber.imagem}`}
        alt={vtuber.nome}
        className="vtuber-image"
      />
      <h3>{vtuber.nome}</h3>
      <p>{vtuber.descricao}</p>
      <p>Empresa: {vtuber.empresa}</p>
      <div className="vtuber-rating">
        <p>Média: {vtuber.media_notas}</p>
        <p>Total de Avaliações: {vtuber.total_avaliacoes}</p>
      </div>
    </div>
  );
}

export default VtuberCard;
