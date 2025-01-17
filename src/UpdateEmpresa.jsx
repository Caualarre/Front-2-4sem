import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./services/api";

const UpdateEmpresa = () => {
  const { id } = useParams(); // Pegando o ID da empresa na URL
  const navigate = useNavigate(); // Para redirecionar após a edição
  const [empresa, setEmpresa] = useState({ nome: "", descricao: "", localizacao: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Buscar detalhes da empresa
  useEffect(() => {
    const fetchEmpresaDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/empresas/${id}`);
        setEmpresa(response.data);
      } catch (err) {
        setError("Erro ao carregar os detalhes da empresa.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresaDetails();
  }, [id]);

  // Atualizar os dados da empresa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/empresas/${id}`, empresa);
      alert("Empresa atualizada com sucesso!");
      navigate(`/empresas/${id}`);
    } catch (err) {
      console.error("Erro ao atualizar a empresa:", err);
      alert("Erro ao atualizar a empresa. Tente novamente.");
    }
  };

  const handleChange = (e) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Empresa</h2>

      <label>Nome:</label>
      <input
        type="text"
        name="nome"
        value={empresa.nome}
        onChange={handleChange}
        required
      />

      <label>Descrição:</label>
      <textarea
        name="descricao"
        value={empresa.descricao}
        onChange={handleChange}
        required
      ></textarea>

      <label>Localização:</label>
      <input
        type="text"
        name="localizacao"
        value={empresa.localizacao}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Atualizar Empresa
      </button>
    </form>
  );
};

export default UpdateEmpresa;
