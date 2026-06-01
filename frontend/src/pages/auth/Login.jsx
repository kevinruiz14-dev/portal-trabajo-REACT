import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Datos enviados:");

    console.log({
      email,
      password,
    });

    // Aquí conectaremos la API después
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