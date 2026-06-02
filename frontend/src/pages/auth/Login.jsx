import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await API.post("/usuarios/login", {
      email,
      password,
    });
    
    const data = response.data;

    console.log("Login exitoso:", data);

    const usuario = data.usuario || data.user || data;
    const { password_hash, ...usuarioParaGuardar } = usuario;

    localStorage.setItem("user", JSON.stringify(usuarioParaGuardar));

    if (usuarioParaGuardar.rol && String(usuarioParaGuardar.rol).toLowerCase().trim() === "empresa") {
      navigate("/empresa/dashboard");
    } else {
      navigate("/");
    }

  } catch (error) {
    console.error("Error en login:", error);
    alert(error.response?.data?.error || error.response?.data?.mensaje || error.response?.data?.message || "Error al iniciar sesión");
  }
};

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="login-logo">
          CherryTreeJob
        </h1>

        <p className="login-subtitle">
          Encuentra tu próxima oportunidad laboral
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Correo electrónico</label>

            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Ingresar
          </button>

        </form>

        <p className="register-text">
            ¿No tienes cuenta?
                <Link to="/registro" className="register-link">
                     {" "}Registrarse
                </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;