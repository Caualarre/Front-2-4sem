import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";

const CreateEmpresa = () => {
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState({ nome: "", descricao: "", localizacao: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/empresas", empresa);
      alert("Empresa criada com sucesso!");
      navigate("/empresas"); // Redirecionar para a lista de empresas
    } catch (err) {
      console.error("Erro ao criar empresa:", err);
      setError("Erro ao criar empresa. Tente novamente.");
    }
  };

  return (
    <>
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

      <form onSubmit={handleSubmit}>
        <h2>Criar Nova Empresa</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

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
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Criar Empresa
        </button>
      </form>
    </>
  );
};

export default CreateEmpresa;;


