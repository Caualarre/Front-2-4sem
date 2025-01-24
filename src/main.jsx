import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CreateVtuber from "./CreateVtuber";
import VtuberDetails from "./VtuberDetails";
import LoginPage from "./LoginPage";
import Register from "./Register";
import UpdateVtuber from "./UpdateVtuber";
import UserList from "./UserList";
import UserDetails from "./UserDetails";
import UpdateUser from "./UpdateUser";
import EmpresaList from "./EmpresaList";
import EmpresaDetails from "./EmpresaDetails";
import UpdateEmpresa from "./UpdateEmpresa";
import CreateEmpresa from "./CreateEmpresa";
import { VtuberProvider } from './context/VtuberContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <VtuberProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<App />} />
          <Route path="/create-vtuber" element={<CreateVtuber />} />
          <Route path="/vtubers/:id" element={<VtuberDetails />} />
          <Route path="/update-vtuber/:id" element={<UpdateVtuber />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/usuarios/:id" element={<UserDetails />} />
          <Route path="/update-usuario/:id" element={<UpdateUser />} />
          <Route path="/empresas" element={<EmpresaList />} />
          <Route path="/empresas/:id" element={<EmpresaDetails />} />
          <Route path="/update-empresa/:id" element={<UpdateEmpresa />} />
          <Route path="/create-empresa" element={<CreateEmpresa />} />
        </Routes>
      </VtuberProvider>
    </BrowserRouter>
  </React.StrictMode>
);
