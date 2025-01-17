import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './services/api';

const UpdateVtuber = () => {
  const { id } = useParams(); // Pegando o ID da URL
  const navigate = useNavigate(); // Para redirecionar após a atualização
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Função para carregar os dados do VTuber para edição
  useEffect(() => {
    const fetchVtuberDetails = async () => {
      try {
        const response = await api.get(`/vtubers/${id}`);
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
      } catch (error) {
        console.error('Erro ao carregar VTuber:', error);
        setMessage('Erro ao carregar VTuber.');
      } finally {
        setLoading(false);
      }
    };

    fetchVtuberDetails();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('_method', 'put');

    try {
      const response = await api.post(`/vtubers/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('VTuber atualizado com sucesso!');
      console.log('Resposta do servidor:', response.data);
      navigate(`/vtubers/${id}`); 
    } catch (error) {
      setMessage('Erro ao atualizar VTuber.');
      console.error('Erro ao atualizar VTuber:', error);
    }
  };

  const handleBack = () => {
    navigate(`/vtubers/${id}`); 
  };

  const handleBackTotal = () => {
    navigate(`/app`); 
  };

  if (loading) return <p>Carregando dados...</p>;

  return (
    <div className="container">
      <h2>Atualizar VTuber</h2>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <label htmlFor="nome">Nome do VTuber:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        ></textarea>

        <button type="submit">Atualizar</button>
      </form>

      {message && <div id="message">{message}</div>}

      <button id="backBtn" onClick={handleBack}>Voltar</button>
      <button id="backBtn" onClick={handleBackTotal}>Voltar Ao Início</button>
    </div>
  );
};

export default UpdateVtuber;
