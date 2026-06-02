import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "../../styles/Dashboard.css";

function Dashboard() {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerOfertas = async () => {
      try {
        const response = await API.get("/ofertas");
        setOfertas(response.data.data || response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };

    obtenerOfertas();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>
        Bienvenido{user ? `, ${user.nombre}` : ""}
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

      <div className="ofertas-section" style={{ marginTop: "40px" }}>
        <h2>Ofertas Recientes</h2>
        {cargando ? (
          <p>Cargando ofertas de empleo...</p>
        ) : (
          <div className="ofertas-grid">
            {ofertas.length > 0 ? (
              ofertas.map((oferta) => (
                <div key={oferta.oferta_id} className="oferta-card" style={{ border: "1px solid #ccc", padding: "15px", margin: "10px 0", borderRadius: "8px" }}>
                  <h3>{oferta.titulo}</h3>
                  <p><strong>Empresa:</strong> {oferta.nombre_empresa}</p>
                  <p><strong>Salario:</strong> {oferta.salario}</p>
                  <p>{oferta.descripcion}</p>
                  <button style={{ padding: "8px 16px", backgroundColor: "#800020", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }}>Aplicar</button>
                </div>
              ))
            ) : (
              <p>No hay ofertas de empleo disponibles por el momento.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;