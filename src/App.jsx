import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SearchAndFilterForm from "./SearchAndFilterForm";
import VtuberCard from "./VtuberCard";
import "./index.css";
import api from "./services/api";

const App = () => {
  const [vtubers, setVtubers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para navegação

  // Função para buscar os VTubers com filtros
  const fetchVtubers = async (filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters).toString();
      const url = params ? `/vtubers-filtro?${params}` : "/vtubers-filtro";
      const response = await api.get(url);
      setVtubers(response.data);
    } catch (err) {
      console.error("Erro ao buscar VTubers:", err);
      setError("Não foi possível carregar os VTubers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVtubers();
  }, []);

  // Função para navegar até a página de criação de VTuber
  const navigateToCreateVtuber = () => {
    navigate("/create-vtuber");
  };

// Função de logout
const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token não encontrado. Usuário não está autenticado.");
    }

    await api.post("/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
    });

    localStorage.removeItem("token"); // Remove o token do localStorage
    navigate("/"); 
  } catch (error) {
    console.error(
      "Erro ao realizar logout:",
      error.response ? error.response.data : error.message
    );
  }
};


  return (
    <div className="App">
      <Header />

      {/* Botão de logout */}
      <button onClick={handleLogout}>Logout</button>

      {/* Botão para criar VTuber */}
      <button onClick={navigateToCreateVtuber}>Criar VTuber</button>

      <SearchAndFilterForm onSearch={fetchVtubers} />

      <div className="vtuber-list">
        {loading ? (
          <p>Carregando VTubers...</p>
        ) : error ? (
          <p>{error}</p>
        ) : vtubers.length > 0 ? (
          vtubers.map((vtuber) => (
            <div
              key={vtuber.id}
              onClick={() => navigate(`/vtubers/${vtuber.id}`)}
            >
              <VtuberCard vtuber={vtuber} />
            </div>
          ))
        ) : (
          <p>Nenhum VTuber encontrado.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default App;
