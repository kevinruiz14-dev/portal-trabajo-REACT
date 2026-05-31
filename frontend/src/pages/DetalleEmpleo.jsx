import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import jobs from "../data/jobs";
import JobDetailsCard from "../components/JobDetailsCard";

const DetalleEmpleo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === parseInt(id));
  

  if (!job) {
    return <p className="text-center mt-4">Empleo no encontrado</p>;
  }

  return (
    <div className="container mt-4">
       <button
  className="btn mb-3"
  style={{ border: "1px solid #800020", color: "#800020" }}
  onClick={() => navigate(-1)}
>
  ← Regresar
</button>
      <div className="row">

        {/* Contenido principal */}
        <div className="col-md-8">
          <JobDetailsCard job={job} />
        </div>

        {/* Sidebar */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">

            <h5>Detalles</h5>

            <p><strong>Empresa:</strong> {job.company}</p>
            <p><strong>Modalidad:</strong> {job.type}</p>
            <p><strong>Categoría:</strong> {job.category}</p>
            <p><strong>Fecha límite:</strong> {job.deadline}</p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DetalleEmpleo;