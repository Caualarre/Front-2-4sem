import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SearchAndFilterForm from "./SearchAndFilterForm";
import VtuberCard from "./VtuberCard";
import "./index.css";
import { useVtuberContext } from "./context/VtuberContext"; // Importa o hook

const App = () => {
  const { vtubers, loading, error, fetchVtubers, handleLogout } = useVtuberContext(); // Consome o contexto
  const navigate = useNavigate(); // Hook para navegação

  // Chama a função fetchVtubers quando o componente for montado
  useEffect(() => {
    fetchVtubers();
  }, []);

  const navigateToCreateVtuber = () => {
    navigate("/create-vtuber");
  };

  const navigateToUserList = () => {
    navigate("/users");
  };

  const navigateToEmpresaList = () => {
    navigate("/empresas");
  };

  return (
    <div className="App">
      <Header />

      <button onClick={handleLogout}>Logout</button>
      <button onClick={navigateToCreateVtuber}>Criar VTuber</button>
      <button onClick={navigateToUserList}>Listar Usuários</button>
      <button onClick={navigateToEmpresaList}>Listar Empresa</button>

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
