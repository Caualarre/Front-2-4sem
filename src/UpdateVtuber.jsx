import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './services/api';

const UpdateVtuber = () => {
  const { id } = useParams(); // Pegando o ID da URL
  const navigate = useNavigate(); // Para redirecionar após a atualização
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null); 
  const [imagemPreview, setImagemPreview] = useState(null); // Para mostrar a imagem atual ou nova
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Função para carregar os dados do VTuber para edição
  useEffect(() => {
    const fetchVtuberDetails = async () => {
      try {
        const response = await api.get(`/vtubers/${id}`);
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
        if (response.data.imagem) {
          setImagemPreview(response.data.imagem); 
        }
      } catch (error) {
        console.error('Erro ao carregar VTuber:', error);
        setMessage('Erro ao carregar VTuber.');
      } finally {
        setLoading(false);
      }
    };

    fetchVtuberDetails();
  }, [id]);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setImagemPreview(URL.createObjectURL(file)); // Atualiza a pré-visualização da imagem
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    if (imagem) {
      formData.append('imagem', imagem); // Adiciona a imagem ao FormData
    }
    formData.append('_method', 'put'); // Envia o método PUT para atualizar

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

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div className="update-vtuber-container">
      <h1>Atualizar VTuber</h1>
      <form onSubmit={handleFormSubmit} className="update-vtuber-form">
        <div className="form-group">
          <label htmlFor="nome">Nome do VTuber:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="imagem">Imagem:</label>
          <input type="file" id="imagem" onChange={handleImagemChange} />
        </div>
        {imagemPreview && (
          <div className="image-preview">
            <p>Pré-visualização:</p>
            <img src={imagemPreview} alt="Preview" className="preview-image" />
          </div>
        )}
        <button type="submit" className="btn-submit">Atualizar</button>
      </form>
      {message && <div className="message">{message}</div>}
      <div className="navigation-buttons">
        <button onClick={handleBack} className="btn-back">Voltar</button>
        <button onClick={handleBackTotal} className="btn-home">Voltar Ao Início</button>
      </div>
    </div>
  );
};

export default UpdateVtuber;
