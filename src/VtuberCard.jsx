import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Importando o Link para navegação

const Card = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  width: 300px; /* Tamanho fixo para o cartão */
  height: 400px; /* Tamanho fixo para o cartão */
  text-align: center;
`;

const Image = styled.img`
  width: 200px; /* Tamanho fixo para a imagem */
  height: 200px; /* Tamanho fixo para a imagem */
  object-fit: cover;
  border-radius: 8px;
`;

const VtuberCard = ({ vtuber }) => (
  <Card>
    <Image src={vtuber.imagem} alt={vtuber.nome} />
    <h3>{vtuber.nome}</h3>
    <p>{vtuber.descricao}</p>
    <p>Empresa: {vtuber.empresa_id}</p>
    <p>Média: {vtuber.media_nota}</p>
  </Card>
);

export default VtuberCard;
