import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const MisAplicaciones = () => {
    const navigate = useNavigate();
  const [aplicaciones, setAplicaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⚠️ ajusta esto según cómo guardes el usuario
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const usuarioId = user?.id;

  useEffect(() => {
    const fetchAplicaciones = async () => {
      try {
        const res = await API.get(`/aplicaciones/usuario/${usuarioId}`);
        setAplicaciones(res.data);
      } catch (error) {
        console.error("Error cargando aplicaciones:", error);
      } finally {
        setLoading(false);
      }
    };
    if (usuarioId !== undefined && usuarioId !== null) {
        fetchAplicaciones();
    } else {
        setLoading(false); // 🔥 IMPORTANTE para que no se quede cargando
    }
    }, []);

  if (loading) return <p>Cargando aplicaciones...</p>;

  return (
    <div className="container mt-4">
      <h2>Mis Aplicaciones</h2>

      {aplicaciones.length === 0 ? (
        <p>No has aplicado a ninguna oferta aún.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Oferta</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>
            {aplicaciones.map((app) => (
              <tr key={app.id}>
                <td>{app.oferta_titulo || app.oferta_id}</td>
                <td>{app.estado}</td>
                <td>
                  {app.created_at
                    ? new Date(app.created_at).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisAplicaciones;