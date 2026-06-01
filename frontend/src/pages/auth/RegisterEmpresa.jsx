import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/RegisterEmpresa.css";

function RegisterEmpresa() {

  const [formData, setFormData] = useState({
  nombre_empresa: "",
  sitio_web: "",
  descripcion: "",
  ubicacion: "",
  email: "",
  telefono: "",
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

    // Crear usuario empresa
    const usuarioResponse = await fetch(
      "http://localhost:3000/api/usuarios",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre_empresa,
          apellido: "Empresa",
          telefono: formData.telefono,
          email: formData.email,
          password: formData.password,
          rol: "empresa",
        }),
      }
    );

    const usuarioData = await usuarioResponse.json();

    if (!usuarioResponse.ok) {
      throw new Error("Error al crear usuario empresa");
    }

    // Crear empresa
    const empresaResponse = await fetch(
      "http://localhost:3000/api/empresas",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: usuarioData.usuario_id,
          nombre_empresa: formData.nombre_empresa,
          sitio_web: formData.sitio_web,
          descripcion: formData.descripcion,
          ubicacion: formData.ubicacion,
        }),
      }
    );

    const empresaData = await empresaResponse.json();

    if (!empresaResponse.ok) {
      throw new Error("Error al crear empresa");
    }

    alert("Empresa registrada correctamente");

    console.log(empresaData);

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
  return (
    <div className="empresa-container">
      <div className="empresa-card">

        <h1 className="empresa-title">
          Registro de Empresa
        </h1>

        <p className="empresa-subtitle">
          Publica ofertas y encuentra talento para tu organización
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Nombre de la Empresa</label>
            <input
              type="text"
              name="nombre_empresa"
              value={formData.nombre_empresa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Sitio Web</label>
            <input
              type="url"
              name="sitio_web"
              placeholder="https://empresa.com"
              value={formData.sitio_web}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Ubicación</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              rows="4"
              value={formData.descripcion}
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
            className="empresa-button"
          >
            Crear Empresa
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

export default RegisterEmpresa;