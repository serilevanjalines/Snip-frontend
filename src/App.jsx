import { useState, useEffect } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ShortenPage from './pages/ShortenPage'

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [currentPage, setCurrentPage] = useState(token ? "shortener" : "login");

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("https://snip-omzp.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setCurrentPage("shortener");
      } else {
        alert("Login failed: " + data.error);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const response = await fetch("https://snip-omzp.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        // auto-login after register
        handleLogin(email, password);
      } else {
        alert("Register failed: " + data.error);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setCurrentPage("login");
  };

  if (!token) {
    if (currentPage === "login") {
      return <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setCurrentPage("register")} />;
    } else {
      return <RegisterPage onRegister={handleRegister} onSwitchToLogin={() => setCurrentPage("login")} />;
    }
  }

  return <ShortenPage token={token} handleLogout={handleLogout} />;
}

export default App;