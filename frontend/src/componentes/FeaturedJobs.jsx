import jobs from "../data/jobs";
import JobDetailsCard from "./JobDetailsCard";

const FeaturedJobs = () => {

  // Tomamos solo 4 empleos
  const featured = jobs.slice(0, 4);

  return (
    <div className="container mt-5">

      <h3 
        className="mb-4 text-center fw-bold"
        style={{ color: "#800020" }}
      >
        EMPLEOS DESTACADOS
      </h3>

      <div className="row">
        {featured.map((job) => (
          <div className="col-md-6" key={job.id}>
            <JobDetailsCard job={job} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default FeaturedJobs;