import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
 
  const [empleos, setEmpleos] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {}
      <section style={{ backgroundColor: 'var(--primary)', borderRadius: '16px', padding: '3.5rem 2rem', color: 'white', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(128, 0, 32, 0.2)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white', fontWeight: '700' }}>
          Encuentra tu próximo empleo
        </h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: '0.9' }}>
          Miles de oportunidades en las mejores empresas te esperan
        </p>
        
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', maxWidth: '800px', margin: '0 auto', flexWrap: 'wrap' }}>
          <input type="text" placeholder="Cargo, palabra clave o empresa..." style={{ flex: '2', minWidth: '250px', border: 'none', padding: '1rem 1.5rem', borderRadius: '12px' }} />
          <input type="text" placeholder="📍 Ubicación..." style={{ flex: '1', minWidth: '150px', border: 'none', padding: '1rem 1.5rem', borderRadius: '12px' }} />
          <button className="btn" style={{ backgroundColor: 'var(--text-main)', color: 'white', padding: '0 2.5rem', borderRadius: '12px' }}>
            Buscar
          </button>
        </div>
      </section>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginTop: '1rem' }}>
        
        {/* Barra Lateral de Filtros */}
        <aside className="card" style={{ width: '280px', flexShrink: 0, position: 'sticky', top: '90px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Filtros</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>Limpiar todo</span>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ marginBottom: '0.5rem', display: 'block' }}>Modalidad de trabajo</label>
            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: '400', cursor: 'pointer', marginBottom: '0.5rem' }}><input type="checkbox" style={{ width: 'auto' }} /> Remoto</label>
            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: '400', cursor: 'pointer', marginBottom: '0.5rem' }}><input type="checkbox" style={{ width: 'auto' }} /> Híbrido</label>
            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" style={{ width: 'auto' }} /> Presencial</label>
          </div>
        </aside>

        {}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>Resultados ({empleos.length})</h2>
          </div>

          {}
          {empleos.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px dashed var(--border)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Aún no hay empleos publicados</h3>
              <p style={{ color: 'var(--text-muted)' }}>Los resultados aparecerán aquí una vez que la base de datos esté conectada.</p>
            </div>
          ) : (
            empleos.map((empleo) => (
              <div key={empleo.id} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem', opacity: empleo.estado === 'cerrado' ? '0.7' : '1' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(128, 0, 32, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary)', flexShrink: 0 }}>
                  {empleo.empresa ? empleo.empresa.charAt(0).toUpperCase() : 'E'}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <span className="badge badge-active">{empleo.tipo || 'Tiempo Completo'}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>{empleo.titulo}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>{empleo.empresa} • {empleo.ubicacion}</p>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end', flexShrink: 0 }}>
                  <span style={{ fontWeight: '700', color: 'var(--success)', fontSize: '1.1rem' }}>
                    {empleo.salario}
                  </span>
                  <Link to="/login" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>Ver Detalles</Link>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default Home;