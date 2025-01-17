import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import api from './services/api'; 

const UserDetails = () => {
  const { id } = useParams();  // Pegando o ID da URL
  const navigate = useNavigate(); // Para redirecionar após a exclusão
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Função para buscar os detalhes do usuário
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/usuarios/${id}`); 
        setUser(response.data);  // Mantendo a resposta sem alterar
      } catch (err) {
        setError("Erro ao carregar os detalhes do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  // Função para excluir o usuário
  const handleDelete = async () => {
    try {
      await api.delete(`/usuarios/${id}`); // Requisição para deletar
      alert("Usuário excluído com sucesso!");
      navigate("/app"); 
    } catch (err) {
      console.error("Erro ao excluir o usuário:", err);
      alert("Erro ao excluir o usuário. Tente novamente.");
    }
  };

  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Usuário não encontrado.</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      
      {/* Exibindo o avatar como uma string (nickname ou outro tipo de texto) */}
      {user.avatar && (
        <div style={{
          backgroundColor: '#f0f0f0',
          color: '#333',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '20px',
          fontWeight: 'bold',
          display: 'inline-block',
        }}>
          {user.avatar}
        </div>
      )}
      
      <p><strong>Email:</strong> {user.email}</p>


      <button 
        onClick={() => navigate(`/update-usuario/${id}`)} 
        style={{
          backgroundColor: 'blue', 
          color: 'white', 
          padding: '10px', 
          border: 'none', 
          cursor: 'pointer', 
          marginRight: '10px',
        }}
      >
        Editar Usuário
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
        Excluir Usuário
      </button>
    </div>
  );
};

export default UserDetails;
