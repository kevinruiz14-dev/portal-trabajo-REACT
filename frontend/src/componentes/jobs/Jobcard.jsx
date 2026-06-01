import { useNavigate } from "react-router-dom";


const JobCard = ({ job }) => {
    const navigate = useNavigate();
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        
        {/* Título */}
        <h5 className="card-title">{job.title}</h5>

        {/* Empresa */}
        <h6 className="card-subtitle mb-2 text-muted">
          {job.company}
        </h6>

        {/* Información */}
        <p className="card-text mb-1">
          📍 {job.location}
        </p>

        <p className="card-text mb-1">
          💰 {job.salary}
        </p>

        <p className="card-text mb-2">
          🏢 {job.type}
        </p>

        {/* Botón */}
        <button
  className="btn btn-primary-custom"
  onClick={() => navigate(`/empleo/${job.id}`)}
>
  Ver más
</button>

      </div>
    </div>
  );
};

export default JobCard;