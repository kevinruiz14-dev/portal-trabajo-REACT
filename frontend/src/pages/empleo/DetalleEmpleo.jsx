const DetalleEmpleo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card" style={{ padding: '2.5rem', borderTop: '5px solid var(--primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Detalle de la Vacante</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Cargando información de la vacante...</p>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="card" style={{ flex: 1, padding: '2.5rem', minHeight: '300px' }}>
          <p style={{ color: 'var(--text-main)', lineHeight: '1.7' }}>Aquí se renderizará toda la descripción, requisitos y beneficios del puesto cuando se extraigan de la base de datos.</p>
        </div>
        <aside className="card" style={{ width: '300px', flexShrink: 0, position: 'sticky', top: '90px' }}>
          <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '1rem' }}>🚀 Postularme Ahora</button>
        </aside>
      </div>
    </div>
  );
};
export default DetalleEmpleo;