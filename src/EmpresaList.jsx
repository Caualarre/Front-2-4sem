import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

const EmpresaList = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  // Função para buscar as empresas
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        setLoading(true);
        const response = await api.get('/empresas'); 
        setEmpresas(response.data);
      } catch (err) {
        setError('Erro ao carregar as empresas.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  // Função para excluir uma empresa
  const handleDelete = async (id) => {
    try {
      await api.delete(`/empresas/${id}`);
      alert('Empresa excluída com sucesso!');
      setEmpresas(empresas.filter((empresa) => empresa.id !== id));
    } catch (err) {
      console.error('Erro ao excluir a empresa:', err);
      alert('Erro ao excluir a empresa. Tente novamente.');
    }
  };

  if (loading) return <p>Carregando empresas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Lista de Empresas</h1>
      <button
        onClick={() => navigate('/create-empresa')}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Criar Nova Empresa
      </button>

      <button
        onClick={() => navigate('/app')}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Voltar ao Inicio
      </button>
      {empresas.length === 0 ? (
        <p>Nenhuma empresa encontrada.</p>
      ) : (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Localização</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr key={empresa.id}>
                <td>{empresa.id}</td>
                <td>{empresa.nome}</td>
                <td>{empresa.descricao}</td>
                <td>{empresa.localizacao}</td>
                <td>
                  <button
                    onClick={() => navigate(`/empresas/${empresa.id}`)}
                    style={{
                      backgroundColor: 'blue',
                      color: 'white',
                      padding: '5px',
                      border: 'none',
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                  >
                    Visualizar
                  </button>
                  <button
                    onClick={() => navigate(`/update-empresa/${empresa.id}`)}
                    style={{
                      backgroundColor: 'orange',
                      color: 'white',
                      padding: '5px',
                      border: 'none',
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(empresa.id)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      padding: '5px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmpresaList;
