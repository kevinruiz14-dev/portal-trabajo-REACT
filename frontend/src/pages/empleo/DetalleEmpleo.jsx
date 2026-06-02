import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import jobs from "../../data/jobs";
import JobDetailsCard from "../../componentes/JobDetailsCard";

const DetalleEmpleo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((j) => j.id === parseInt(id));

  //  estado del modal
  const [showModal, setShowModal] = useState(false);

  if (!job) {
    return <p className="text-center mt-4">Empleo no encontrado</p>;
  }

  return (
    <div className="container mt-4">

      {/* BOTÓN REGRESAR */}
      <button
        className="btn mb-3"
        style={{ border: "1px solid #800020", color: "#800020" }}
        onClick={() => navigate(-1)}
      >
        ← Regresar
      </button>

      <div className="row">

        {/* CONTENIDO */}
        <div className="col-md-8">
          <JobDetailsCard job={job} />
        </div>

        {/* SIDEBAR */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">

            <h5>Detalles</h5>

            <p><strong>Empresa:</strong> {job.company}</p>
            <p><strong>Modalidad:</strong> {job.type}</p>
            <p><strong>Categoría:</strong> {job.category}</p>
            <p><strong>Fecha límite:</strong> {job.deadline}</p>

            {/* BOTÓN APLICAR */}
            <button
              className="btn mt-3"
              style={{ backgroundColor: "#800020", color: "#fff" }}
              onClick={() => setShowModal(true)}
            >
              Aplicar
            </button>

          </div>
        </div>

      </div>

      {/*  MODAL */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Aplicar a empleo</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">

                <div className="mb-3">
                  <label>Nombre completo</label>
                  <input type="text" className="form-control" />
                </div>

                <div className="mb-3">
                  <label>Dirección</label>
                  <input type="text" className="form-control" />
                </div>

                <div className="mb-3">
                  <label>Teléfono</label>
                  <input type="text" className="form-control" />
                </div>

                <div className="mb-3">
                  <label>Adjuntar CV</label>
                  <input type="file" className="form-control" />
                </div>

              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>

                <button
                  className="btn"
                  style={{ backgroundColor: "#800020", color: "#fff" }}
                  onClick={() => {
                    alert("Aplicación enviada");
                    setShowModal(false);
                  }}
                >
                  Enviar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DetalleEmpleo;