import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import AdminPanel from './AdminPanel';
import Login from './Login';
import './App.css';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <div className="navbar">
          <h1>Home CIJ</h1>
          <AdminButton authenticated={authenticated} />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={authenticated ? <AdminPanel /> : <Login setAuthenticated={setAuthenticated} />}
          />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
};

const AdminButton = ({ authenticated }) => {
  const navigate = useNavigate();
  const handleAdminClick = () => {
    if (authenticated) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  return (
    <button className="admin-button" onClick={handleAdminClick}>
      Admin Panel
    </button>
  );
};

export default App;
