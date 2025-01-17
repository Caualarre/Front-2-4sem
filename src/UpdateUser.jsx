// src/UpdateUser.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./services/api";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  // Carregar dados do usuário ao montar o componente
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/usuarios/${id}`);
        setUser(response.data);
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
        setError("Não foi possível carregar os dados do usuário.");
      }
    };
    fetchUser();
  }, [id]);

  // Função para atualizar o usuário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/usuarios/${id}`, user);
      navigate("/users");
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      setError("Erro ao atualizar usuário.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="update-user-container">
      <h1>Editar Usuário</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default UpdateUser;
