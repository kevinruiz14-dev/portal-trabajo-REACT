import EmptyJobs from "../components/EmptyJobs";
import Filters from "../components/Filters";
import { useState } from "react";
import jobsData from "../data/jobs";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import FeaturedJobs from "../components/FeaturedJobs";
import LoadingJobs from "../components/LoadingJobs";
import { useEffect } from "react";

const Empleos = () => {
  const [search, setSearch] = useState("");
    
  const [filters, setFilters] = useState({
  location: "",
  type: "",
  category: ""
});
const [loading, setLoading] = useState(true);

// Simular carga
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar empleos
  const filteredJobs = jobsData.filter((job) => {
  return (
    (job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())) &&
    (filters.location === "" || job.location === filters.location) &&
    (filters.type === "" || job.type === filters.type) &&
    (filters.category === "" || job.category === filters.category)
  );
});

// Loading
  if (loading) {
    return <LoadingJobs />;
  }

  return (
    <div className="container mt-4">

     <h2 
  className="mb-4 text-center fw-bold"
  style={{ color: "#800020" }}
>
  LISTA GENERAL DE EMPLEOS
</h2>

      {/* Buscador */}
      <SearchBar search={search} setSearch={setSearch} />
        {/* Filtros */}
<Filters filters={filters} setFilters={setFilters} />

      {/* Lista */}
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}

      {/* Si no hay resultados */}
      {filteredJobs.length === 0 && <EmptyJobs />}
    </div>
  );
};


<FeaturedJobs />

export default Empleos;