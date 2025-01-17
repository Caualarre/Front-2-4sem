import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import api from './services/api'; 

const VtuberDetails = () => {
  const { id } = useParams();  // Pegando o ID da URL
  const navigate = useNavigate(); // Para redirecionar
  const [vtuber, setVtuber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Função para buscar os detalhes da VTuber
  useEffect(() => {
    const fetchVtuberDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/vtubers/${id}`); 
        setVtuber(response.data);
      } catch (err) {
        setError("Erro ao carregar os detalhes do VTuber.");
      } finally {
        setLoading(false);
      }
    };

    fetchVtuberDetails();
  }, [id]);

  // Função para excluir a VTuber
  const handleDelete = async () => {
    try {
      await api.delete(`/vtubers/${id}`); // Requisição para deletar
      alert("VTuber excluído com sucesso!");
      navigate("/app"); 
    } catch (err) {
      console.error("Erro ao excluir a VTuber:", err);
      alert("Erro ao excluir a VTuber. Tente novamente.");
    }
  };

  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!vtuber) return <p>VTuber não encontrado.</p>;

  return (
    <div>
      <h2>{vtuber.nome}</h2>
      <img src={vtuber.imagem} alt={vtuber.nome} style={{ width: '300px', height: 'auto' }} />
      <p><strong>Descrição:</strong> {vtuber.descricao}</p>
      <p><strong>Empresa:</strong> {vtuber.empresa_id}</p>
      <p><strong>Média de Notas:</strong> {vtuber.media_nota}</p>

      <button 
        onClick={() => navigate(`/update-vtuber/${id}`)} 
        style={{
          backgroundColor: 'blue', 
          color: 'white', 
          padding: '10px', 
          border: 'none', 
          cursor: 'pointer', 
          marginRight: '10px',
        }}
      >
        Editar VTuber
      </button>

      <button 
        onClick={handleDelete} 
        style={{
          backgroundColor: 'red', 
          color: 'white', 
          padding: '10px', 
          border: 'none', 
          cursor: 'pointer',
        }}
      >
        
        Excluir VTuber
      </button>
      <button 
        onClick={() => navigate(`/app`)} 
        style={{
          backgroundColor: 'blue', 
          color: 'white', 
          padding: '10px', 
          border: 'none', 
          cursor: 'pointer', 
          marginRight: '10px',
        }}
      >
        Voltar ao Inicio
      </button>
    </div>
  );
};

export default VtuberDetails;
