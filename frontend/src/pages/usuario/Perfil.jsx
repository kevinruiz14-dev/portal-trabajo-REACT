import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Perfil.css";

function Perfil() {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const navigate = useNavigate();

  const [nombre, setNombre] = useState(user?.nombre || "");
  const [apellido, setApellido] = useState(user?.apellido || "");
  const [telefono, setTelefono] = useState(user?.telefono || "");
  const [resumen, setResumen] = useState(user?.resumen_profesional || "");

  const cerrarSesion = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const guardarCambios = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/usuarios/${user.usuario_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            apellido,
            telefono,
            email: user.email,
            password: user.password_hash,
            rol: user.rol,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error al actualizar");
        return;
      }

      const usuarioActualizado = {
        ...user,
        nombre,
        apellido,
        telefono,
        resumen_profesional: resumen,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(usuarioActualizado)
      );

      alert("Perfil actualizado correctamente");

    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="perfil-container">
      <h1>Mi Perfil</h1>

      <div className="perfil-card">

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