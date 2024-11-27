import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  

  const handleLogin = (e) => {
    e.preventDefault();
    // simulada
    if (email === "user@example.com" && password === "1234") {
      alert("Login bem-sucedido!");
      navigate("/tarefas");  // Redireciona para a página
    } else {
      alert("E-mail ou senha inválidos!");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h2>Página de Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <label>
          E-mail:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Senha:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
