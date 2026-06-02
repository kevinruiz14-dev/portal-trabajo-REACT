import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "../../styles/Perfil.css";

function Perfil() {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const navigate = useNavigate();

  const [nombre, setNombre] = useState(user?.nombre || "");
  const [apellido, setApellido] = useState(user?.apellido || "");
  const [telefono, setTelefono] = useState(user?.telefono || "");
  const [resumen, setResumen] = useState(user?.resumen_profesional || "");
  const [cvUrl, setCvUrl] = useState(user?.url_cv || "");

  const cerrarSesion = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const guardarCambios = async () => {
    try {
      const response = await API.put(`/usuarios/${user.usuario_id}`, {
        nombre,
        apellido,
        telefono,
        email: user.email,
        rol: user.rol,
        resumen_profesional: resumen,
        url_cv: cvUrl,
      });

      const data = response.data;

      const { password_hash, ...usuarioParaGuardar } = data.usuario;

      localStorage.setItem("user", JSON.stringify(usuarioParaGuardar));

      window.location.reload();

      alert("Perfil actualizado correctamente");

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.mensaje || "Error al conectar con el servidor");
    }
  };

  return (
    <div className="perfil-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Mi Perfil</h1>

      <div className="perfil-card" style={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "10px" }}>

        <label>Nombre</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Apellido</label>
        <input
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <label>Teléfono</label>
        <input
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <label>Resumen Profesional</label>
        <textarea
          rows="4"
          value={resumen}
          onChange={(e) => setResumen(e.target.value)}
        />

        <label>URL del CV</label>
        <input
          type="url"
          value={cvUrl}
          onChange={(e) => setCvUrl(e.target.value)}
        />

        <button onClick={guardarCambios}>
          Guardar Cambios
        </button>

        <button
          onClick={cerrarSesion}
          className="logout-button"
        >
          Cerrar Sesión
        </button>

      </div>
    </div>
  );
}

export default Perfil;