import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from './services/api';

const CreateVtuber = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [imagem, setImagem] = useState(null); // Imagem do tipo arquivo
  const navigate = useNavigate(); // Hook para navegar

  // Função para lidar com o upload da imagem
  const handleImagemChange = (e) => {
    setImagem(e.target.files[0]); 
  };

  // Função para enviar os dados do formulário
  const handleCreateVtuber = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Usando FormData para enviar arquivos
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('empresa_id', empresaId);
    if (imagem) {
      formData.append('imagem', imagem); // Adiciona o arquivo da imagem
    }

    try {
      // Enviando a requisição POST para criar o VTuber
      const response = await api.post('/vtubers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Necessário para enviar arquivos
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Enviando o token de autenticação
        },
      });
      console.log('VTuber criado com sucesso:', response.data);

      // Redirecionando para a página "app" após a criação do VTuber
      navigate('/app');
    } catch (error) {
      console.error('Erro ao criar VTuber:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Criar VTuber</h2>
      <form onSubmit={handleCreateVtuber}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Empresa:
          <input
            type="text"
            value={empresaId}
            onChange={(e) => setEmpresaId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Imagem:
          <input
            type="file"
            onChange={handleImagemChange}
            required
          />
        </label>
        <br />
        <button type="submit">Criar VTuber</button>
      </form>
    </div>
  );
};

export default CreateVtuber;
