import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SearchAndFilterForm from './SearchAndFilterForm';
import VtuberCard from './VtuberCard';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const vtubers = [
  {
    codvtuber: 1,
    nome: 'Kizuna AI',
    descricao: 'Uma das primeiras VTubers. Famosa por sua energia positiva e interatividade.',
    imagem: 'Oni.png',
    empresa: 'Independente',
    media_notas: 4.5,
    total_avaliacoes: 120,
  },
  {
    codvtuber: 2,
    nome: 'Gawr Gura',
    descricao: 'A famosa tubarão da Hololive. Conhecida por suas piadas e boas risadas.',
    imagem: 'gawr-gura.jpg',
    empresa: 'Hololive',
    media_notas: 4.8,
    total_avaliacoes: 200,
  },
  {
    codvtuber: 3,
    nome: 'Shiro',
    descricao: 'A VTuber de uma personalidade tranquila e relaxante.',
    imagem: 'VTUBER.webp',
    empresa: 'Independente',
    media_notas: 4.7,
    total_avaliacoes: 150,
  },
  {
    codvtuber: 4,
    nome: 'Pikamee',
    descricao: 'VTuber japonesa com personalidade engraçada e muito carismática.',
    imagem: 'Sangue.png',
    empresa: 'Independente',
    media_notas: 4.6,
    total_avaliacoes: 180,
  },
];

function App() {
  return (
    <Container>
      <Header />
      <Main>
        <h1>Lista de VTubers</h1>
        <SearchAndFilterForm />
        <div className="vtuber-list">
          {vtubers.map((vtuber) => (
            <VtuberCard key={vtuber.codvtuber} vtuber={vtuber} />
          ))}
        </div>
      </Main>
      <Footer />
    </Container>
  );
}

export default App;
