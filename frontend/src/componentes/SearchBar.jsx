const SearchBar = ({ search, setSearch }) => {

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control search-input"
        placeholder="Buscar por título, empresa o palabra clave..."
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;