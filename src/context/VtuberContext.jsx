import React, { createContext, useState, useContext, useEffect, useCallback } from "react"; 
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const VtuberContext = createContext();

export const useVtuberContext = () => {
  const context = useContext(VtuberContext);
  if (!context) {
    throw new Error("useVtuberContext deve ser usado dentro de um VtuberProvider");
  }
  return context;
};

export const VtuberProvider = ({ children }) => {
  const [vtubers, setVtubers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchVtubers = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const url = params ? `/vtubers-filtro?${params}` : "/vtubers-filtro";
      const response = await api.get(url);
      setVtubers(response.data);
      setError(null); // Limpa qualquer erro anterior
    } catch (err) {
      console.error("Erro ao buscar VTubers:", err);
      setError("Não foi possível carregar os VTubers.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVtuberById = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/vtubers/${id}`);
      setError(null); // Limpa qualquer erro anterior
      return response.data;
    } catch (err) {
      console.error("Erro ao carregar os detalhes do VTuber:", err);
      setError("Erro ao carregar VTuber.");
      throw new Error("Erro ao carregar VTuber.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createVtuber = async (formData) => {
    try {
      const response = await api.post("/vtubers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("VTuber criado com sucesso:", response.data);
      navigate("/app");
    } catch (error) {
      console.error("Erro ao criar VTuber:", error);
      setError("Erro ao criar VTuber.");
    }
  };

  const updateVtuber = async (id, formData) => {
    try {
      formData.append('_method', 'put');
      const response = await api.post(`/vtubers/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("VTuber atualizado com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar VTuber:", error);
      setError("Erro ao atualizar VTuber.");
      throw new Error("Erro ao atualizar VTuber.");
    }
  };

  const deleteVtuber = async (id) => {
    try {
      await api.delete(`/vtubers/${id}`);
      alert("VTuber excluído com sucesso!");
      navigate("/app");
    } catch (err) {
      console.error("Erro ao excluir o VTuber:", err);
      alert("Erro ao excluir o VTuber. Tente novamente.");
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado. Usuário não está autenticado.");
      }

      await api.post("/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      navigate("/"); // Navegação para a página inicial após o logout
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      setError("Erro ao realizar logout.");
    }
  };

  useEffect(() => {
    fetchVtubers();
  }, [fetchVtubers]);

  return (
    <VtuberContext.Provider
      value={{
        vtubers,
        loading,
        error,
        fetchVtubers,
        createVtuber,
        fetchVtuberById,
        updateVtuber,
        deleteVtuber,
        handleLogout,
      }}
    >
      {children}
    </VtuberContext.Provider>
  );
};
