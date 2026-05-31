const Filters = ({ filters, setFilters }) => {

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleClear = () => {
    setFilters({
      location: "",
      type: "",
      category: ""
    });
  };

  return (
    <div className="row mb-4">

      {/* Ubicación */}
      <div className="col-md-3">
        <select
          className="form-select"
          name="location"
          value={filters.location}
          onChange={handleChange}
        >
          <option value="">Ubicación</option>
          <option value="San Salvador">San Salvador</option>
          <option value="Santa Ana">Santa Ana</option>
          <option value="San Miguel">San Miguel</option>
        </select>
      </div>

      {/* Modalidad */}
      <div className="col-md-3">
        <select
          className="form-select"
          name="type"
          value={filters.type}
          onChange={handleChange}
        >
          <option value="">Modalidad</option>
          <option value="Remoto">Remoto</option>
          <option value="Presencial">Presencial</option>
        </select>
      </div>

      {/* Categoría */}
      <div className="col-md-3">
        <select
          className="form-select"
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">Categoría</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Diseño">Diseño</option>
          <option value="Marketing">Marketing</option>
          <option value="Finanzas">Finanzas</option>
        </select>
      </div>

      {/* Botón limpiar */}
      <div className="col-md-3">
        <button
          className="btn btn-secondary w-100"
          onClick={handleClear}
        >
          Limpiar 
        </button>
      </div>

    </div>
  );
};

export default Filters;