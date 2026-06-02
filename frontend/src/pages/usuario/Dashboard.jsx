import { Link } from "react-router-dom";
import "../../styles/Dashboard.css";

function Dashboard() {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div className="dashboard-container">
      <h1>
        Bienvenido{user ? `, ${user.nombre}` : ""} 👋
      </h1>

      <p className="dashboard-subtitle">
        ¿Qué deseas hacer hoy?
      </p>

      <div className="dashboard-cards">

        <Link to="/empleos" className="dashboard-card">
          <h2>Buscar Empleos</h2>
          <p>Explora oportunidades laborales disponibles.</p>
        </Link>

        <Link to="/perfil" className="dashboard-card">
          <h2>Mi Perfil</h2>
          <p>Actualiza tu información personal y CV.</p>
        </Link>

        <Link to="/mis-aplicaciones" className="dashboard-card">
          <h2>Mis Aplicaciones</h2>
          <p>Consulta tus postulaciones realizadas.</p>
        </Link>

      </div>
    </div>
  );
}

export default Dashboard;