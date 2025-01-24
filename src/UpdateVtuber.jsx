import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVtuberContext } from './context/VtuberContext'; // Importando o contexto
import Header from './Header';
import Footer from './Footer';
import './UpdateVtuber.css'; // Importando o CSS

const UpdateVtuber = () => {
  const { id } = useParams(); // Pegando o ID da URL
  const navigate = useNavigate(); // Para redirecionar após a atualização
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null); 
  const [imagemPreview, setImagemPreview] = useState(null); 
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const { fetchVtuberById, updateVtuber } = useVtuberContext(); 

  useEffect(() => {
    const fetchVtuberDetails = async () => {
      try {
        const response = await fetchVtuberById(id); 
        setNome(response.nome);
        setDescricao(response.descricao);
        if (response.imagem) {
          setImagemPreview(response.imagem); 
        }
      } catch (error) {
        console.error('Erro ao carregar VTuber:', error);
        setMessage('Erro ao carregar VTuber.');
      } finally {
        setLoading(false);
      }
    };

    fetchVtuberDetails();
  }, [id, fetchVtuberById]);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setImagemPreview(URL.createObjectURL(file)); 
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    if (imagem) {
      formData.append('imagem', imagem); 
    }

    try {
      await updateVtuber(id, formData); 
      setMessage('VTuber atualizado com sucesso!');
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
    <div>
      <Header />
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
      <Footer />
    </div>
  );
};

export default UpdateVtuber;
