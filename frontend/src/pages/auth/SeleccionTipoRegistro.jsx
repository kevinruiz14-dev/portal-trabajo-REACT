import { Link } from "react-router-dom";
import "../../styles/SeleccionTipoRegistro.css";

function SeleccionTipoRegistro() {
  return (
    <div className="registro-container">
      <div className="registro-card">

        <h1>Crear Cuenta</h1>

        <p>
          ¿Cómo deseas registrarte?
        </p>

        <div className="opciones">

          <Link
            to="/register-usuario"
            className="opcion-btn"
          >
            Busco empleo
          </Link>

          <Link
            to="/register-empresa"
            className="opcion-btn"
          >
            Soy empresa
          </Link>

        </div>

      </div>
    </div>
  );
}

export default SeleccionTipoRegistro;