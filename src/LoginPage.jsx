import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      // Se o login for bem-sucedido, armazena o token e redireciona
      localStorage.setItem('token', response.data.token);  // Armazena o token
      setError('');
      navigate('/app');  // Redireciona para a página principal (App)

    } catch (err) {
      setError('E-mail ou senha inválidos!');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Não tem uma conta?{" "}
        <button onClick={() => navigate("/register")}>Cadastre-se</button>
      </p>
    </div>
  );
};

export default LoginPage;
