import { useState } from "react";

const JobDetailsCard = ({ job }) => {

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    cv: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cv") {
      setFormData({ ...formData, cv: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Datos enviados:", formData);
    alert("Aplicación enviada correctamente ✅");
  };

  return (
    <div className="card p-4 shadow-sm">

      <h2>{job.title}</h2>
      <p className="text-muted">{job.company}</p>

      <p>📍 {job.location}</p>
      <p>💰 {job.salary}</p>
      <p>📅 {job.date}</p>
      <p><strong>Fecha límite:</strong> {job.deadline}</p>

      <hr />

      <h5>Descripción</h5>
      <p>{job.description}</p>

      <h5>Requisitos</h5>
      <p>{job.requirements}</p>

      <h5>Beneficios</h5>
      <p>{job.benefits}</p>

      {/* BOTÓN APLICAR */}
      <button
        className="btn btn-primary-custom mt-3"
        data-bs-toggle="modal"
        data-bs-target="#applyModal"
      >
        Aplicar
      </button>

      {/* MODAL */}
      <div
        className="modal fade"
        id="applyModal"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Aplicar al empleo</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">

                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Adjuntar CV</label>
                  <input
                    type="file"
                    className="form-control"
                    name="cv"
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>

                <button type="submit" className="btn btn-success">
                  Enviar Aplicación
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  );
};

export default JobDetailsCard;