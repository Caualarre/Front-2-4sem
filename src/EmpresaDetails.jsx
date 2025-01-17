import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./services/api";

const EmpresaDetails = () => {
  const { id } = useParams(); // Pegando o ID da empresa na URL
  const navigate = useNavigate(); // Para redirecionar
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


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

  const handleDelete = async () => {
    try {
      await api.delete(`/empresas/${id}`);
      alert("Empresa excluída com sucesso!");
      navigate("/empresas");
    } catch (err) {
      console.error("Erro ao excluir a empresa:", err);
      alert("Erro ao excluir a empresa. Tente novamente.");
    }
  };

  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!empresa) return <p>Empresa não encontrada.</p>;

  return (
    <div>
      <h2>{empresa.nome}</h2>
      <p><strong>Descrição:</strong> {empresa.descricao}</p>
      <p><strong>Localização:</strong> {empresa.localizacao}</p>

      <button
        onClick={() => navigate(`/update-empresa/${id}`)}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Editar Empresa
      </button>

      <button
        onClick={handleDelete}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Excluir Empresa
      </button>
    </div>
  );
};

export default EmpresaDetails;
