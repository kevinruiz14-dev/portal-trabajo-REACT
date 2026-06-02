import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/RegisterUsuario.css";
import API from "../../services/api";

function RegisterUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Usamos Axios (API) para mantener la consistencia y capturar mejor los errores
    const response = await API.post("/usuarios", {
      ...formData,
      rol: "postulante",
    });

    alert("Usuario registrado correctamente");
    
    setFormData({
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      password: "",
    });

    // Aseguramos que la ruta coincida exactamente con la declarada en tus rutas (generalmente minúsculas)
    navigate("/login");

  } catch (error) {
    console.error(error);
    // Mostramos el mensaje exacto que devuelve el backend (App.js devuelve 'error', otros 'message')
    alert(error.response?.data?.error || error.response?.data?.message || "Error al registrar usuario");
  }
};

  return (
    <div className="register-container">
      <div className="register-card">

        <h1 className="register-title">
          Crear Cuenta
        </h1>

        <p className="register-subtitle">
          Regístrate para comenzar a buscar empleo
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="register-button"
          >
            Crear Cuenta
          </button>

        </form>

        <p className="login-text">
          ¿Ya tienes cuenta?
          <Link to="/login" className="login-link">
            {" "}Inicia sesión
          </Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterUsuario;