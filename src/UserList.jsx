// src/UserList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";
import "./user.css"; // Estilos específicos para a página de listagem

const UserList = () => {
  const [users, setUsers] = useState([]); // Lista de usuários
  const [loading, setLoading] = useState(true); // Indicador de carregamento
  const [error, setError] = useState(null); // Mensagem de erro, se ocorrer
  const navigate = useNavigate(); // Para navegação entre páginas

  // Função para buscar a lista de usuários
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/usuarios"); // Rota para obter usuários
      setUsers(response.data.data); // Atualiza o estado com os usuários retornados
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
      setError("Não foi possível carregar os usuários.");
    } finally {
      setLoading(false);
    }
  };

  // Chama a função para carregar usuários quando o componente é montado
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para navegar para a página de criação de usuários
  const navigateToCreateUser = () => {
    navigate("/register");
  };

  return (
    <div className="user-list-container">
      <h1>Lista de Usuários</h1>

      <button className="create-user-btn" onClick={navigateToCreateUser}>
        Adicionar Novo Usuário
      </button>

      {/* Exibição de carregamento, erro ou a lista de usuários */}
      {loading ? (
        <p>Carregando usuários...</p>
      ) : error ? (
        <p>{error}</p>
      ) : users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>

                  <button
                    onClick={() => navigate(`/usuarios/${user.id}`)}
                    className="details-btn"
                  >
                    Detalhes
                  </button>


                  <button
                    onClick={() => navigate(`/update-usuario/${user.id}`)}
                    className="edit-btn"
                  >
                    Editar
                  </button>


                  <button
                    onClick={async () => {
                      if (
                        window.confirm(
                          `Tem certeza que deseja excluir o usuário ${user.name}?`
                        )
                      ) {
                        try {
                          await api.delete(`/usuarios/${user.id}`);
                          fetchUsers(); // Atualiza a lista após excluir
                          alert("Usuário excluído com sucesso!");
                        } catch (err) {
                          console.error("Erro ao excluir usuário:", err);
                          alert("Erro ao excluir usuário.");
                        }
                      }
                    }}
                    className="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </div>
  );
};

export default UserList;
