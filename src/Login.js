// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthenticated }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'cij151') {
      setAuthenticated(true);
      navigate('/admin');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="Contraseña"
          placeholder="Ingrese contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="Enter">Login</button>
      </form>
    </div>
  );
};

export default Login;
