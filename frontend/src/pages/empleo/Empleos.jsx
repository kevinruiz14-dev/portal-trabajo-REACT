import { useEffect, useState } from "react";
import jobsData from "../data/jobs";

import JobCard from "../componentes/JobCard";
import LoadingJobs from "../componentes/LoadingJobs";
import EmptyJobs from "../componentes/EmptyJobs";
import FeaturedJobs from "../componentes/FeaturedJobs";

const Empleos = () => {
  const [loading, setLoading] = useState(true);

  // 🔥 NUEVO ESTADO
  const [mostrarResultados, setMostrarResultados] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingJobs />;
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-4 text-center fw-bold" style={{ color: "#800020" }}>
        LISTA GENERAL DE EMPLEOS
      </h2>

      <FeaturedJobs />

      {/* 🔥 BOTÓN BUSCAR (el de tus compañeros) */}
      <div className="text-center mb-4">
        <button
          className="btn"
          style={{ backgroundColor: "#800020", color: "#fff" }}
          onClick={() => setMostrarResultados(true)}
        >
          Buscar
        </button>
      </div>

      {/* 🔥 RESULTADOS SOLO SI SE PRESIONA */}
      {mostrarResultados && (
        <>
          {jobsData.length > 0 ? (
            jobsData.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <EmptyJobs />
          )}
        </>
      )}

    </div>
  );
};

export default Empleos;