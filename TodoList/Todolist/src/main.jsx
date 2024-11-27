import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WrappedApp from "./App";  // App com o Provider do contexto
import LoginPage from "./pages/LoginPage";  // Página de Login
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />  {/* Página de Login é a inicial */}
        <Route path="/tarefas" element={<WrappedApp />} />  {/* Página de Tarefas */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
