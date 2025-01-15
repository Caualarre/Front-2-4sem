import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";  // Página principal com a lista e filtros de VTubers
import CreateVtuber from "./CreateVtuber";  // Página de criação de VTuber
import VtuberDetails from "./VtuberDetails"; // Página de detalhes do VTuber
import LoginPage from "./LoginPage";  // Página de Login
import Register from "./Register";  // Página de Registro

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />  {/* Página de Login como inicial */}
        <Route path="/register" element={<Register />} />  {/* Página de Registro/criação de usuário */}
        <Route path="/app" element={<App />} />  {/* Página principal com a lista de VTubers e filtros */}
        <Route path="/create-vtuber" element={<CreateVtuber />} /> {/* Página de criação de VTuber */}
        <Route path="/vtubers/:id" element={<VtuberDetails />} /> {/* Página de detalhes do VTuber */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
