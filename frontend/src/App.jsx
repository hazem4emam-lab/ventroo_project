
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";

const services = [
  { name: "Electricians", icon: "⚡" },
  { name: "Plumbers", icon: "💧" },
  { name: "Carpenters", icon: "🪚" },
  { name: "Painters", icon: "🎨" },
  { name: "AC Technicians", icon: "❄️" },
];

function Home() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    fetch("http://localhost:3000/api/health")
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("Offline"));
  }, []);

  return (
    <div className="home-page">
      <header className="site-header">
        <Link to="/" className="site-logo">
          🔧 Ventro
        </Link>

        <nav className="site-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="primary-link">
            Get Started
          </Link>
        </nav>
      </header>

      <section className="hero-section">
        <h1 id="project-name">Ventro</h1>

        <h2>Trusted Home Services, Made Simple.</h2>

        <p>
          Find skilled electricians, plumbers, carpenters,
          painters and AC technicians across Egypt.
        </p>

        <Link to="/register" className="hero-button">
          Find a Professional
        </Link>

        <p>Backend Status: {status}</p>
      </section>

      <section className="services-section">
        <h2>Explore Our Services</h2>
        <p>Everything your home needs, in one place.</p>

        <div className="service-grid">
          {services.map((service) => (
            <div className="service-item" key={service.name}>
              <span>{service.icon}</span>
              <h3>{service.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(sessionStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <main className="dashboard-page">
      <h1>Welcome, {user.name} 👋</h1>
      <p>Account type: {user.role}</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          🔍 Browse Professionals
        </div>

        <div className="dashboard-card">
          ❤️ My Favourites
        </div>

        <div className="dashboard-card">
          📅 My Requests
        </div>

        <div className="dashboard-card">
          ⭐ My Reviews
        </div>
      </div>

      <button onClick={logout}>Logout</button>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
