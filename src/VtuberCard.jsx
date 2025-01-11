import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const VtuberCard = ({ vtuber }) => (
  <Card>
    <Image src={`/images/${vtuber.imagem}`} alt={vtuber.nome} />
    <h3>{vtuber.nome}</h3>
    <p>{vtuber.descricao}</p>
    <p>Empresa: {vtuber.empresa}</p>
    <p>Média: {vtuber.media_notas}</p>
    <p>Total de Avaliações: {vtuber.total_avaliacoes}</p>
  </Card>
);

export default VtuberCard;
