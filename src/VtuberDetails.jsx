import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVtuberContext } from "./context/VtuberContext";
import Header from "./Header";
import Footer from "./Footer";
import "./VtuberDetails.css"; // Importando o CSS

const VtuberDetails = () => {
  const { id } = useParams();  // Pegando o ID da URL
  const navigate = useNavigate(); // Para redirecionar
  const { fetchVtuberById, deleteVtuber, loading, error } = useVtuberContext(); // Usando o contexto
  const [vtuber, setVtuber] = useState(null);


  useEffect(() => {
    const loadVtuberDetails = async () => {
      try {
        const fetchedVtuber = await fetchVtuberById(id); 
        setVtuber(fetchedVtuber);
      } catch (err) {

        console.error("Erro ao buscar detalhes do VTuber:", err);
      }
    };

    loadVtuberDetails();
  }, [id, fetchVtuberById]);

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este VTuber?")) {
      await deleteVtuber(id); 
      navigate("/app"); 
    }
  };

 
  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>; 
  if (!vtuber) return <p>VTuber não encontrado.</p>;

  return (
    <div>
      <Header />
      <div className="vtuber-details-container">
        <h2>{vtuber.nome}</h2>
        <img src={vtuber.imagem} alt={vtuber.nome} className="vtuber-image" />
        <p><strong>Descrição:</strong> {vtuber.descricao}</p>
        <p><strong>Empresa:</strong> {vtuber.empresa_id}</p>
        <p><strong>Média de Notas:</strong> {vtuber.media_nota}</p>

        <button
          onClick={() => navigate(`/update-vtuber/${id}`)}
          className="edit-button"
        >
          Editar VTuber
        </button>

        <button
          onClick={handleDelete}
          className="delete-button"
        >
          Excluir VTuber
        </button>

        <button
          onClick={() => navigate(`/app`)}
          className="back-button"
        >
          Voltar ao Início
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default VtuberDetails;
