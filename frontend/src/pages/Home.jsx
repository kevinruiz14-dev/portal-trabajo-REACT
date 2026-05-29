import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <section style={{ backgroundColor: 'var(--primary)', borderRadius: '16px', padding: '3.5rem 2rem', color: 'white', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(128, 0, 32, 0.2)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white', fontWeight: '700' }}>
          Encuentra tu próximo empleo
        </h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: '0.9' }}>
          Te esperan miles de oportunidades en las mejores empresas
        </p>
        
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', maxWidth: '800px', margin: '0 auto', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Cargo, palabra clave o empresa..." 
            style={{ flex: '2', minWidth: '250px', border: 'none', padding: '1rem 1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
          />
          <input 
            type="text" 
            placeholder="📍 Ubicación..." 
            style={{ flex: '1', minWidth: '150px', border: 'none', padding: '1rem 1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
          />
          <button className="btn" style={{ backgroundColor: 'var(--text-main)', color: 'white', padding: '0 2.5rem', borderRadius: '12px' }}>
            Buscar
          </button>
        </div>
      </section>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginTop: '1rem' }}>
        
        <aside className="card" style={{ width: '280px', flexShrink: 0, position: 'sticky', top: '90px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Filtros</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>Limpiar todo</span>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ marginBottom: '0.5rem', display: 'block' }}>Modalidad de trabajo</label>
            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: '400', cursor: 'pointer', marginBottom: '0.5rem' }}>
              <input type="checkbox" style={{ width: 'auto' }} /> Remoto
            </label>
            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: '400', cursor: 'pointer', marginBottom: '0.5rem' }}>
              <input type="checkbox" style={{ width: 'auto' }} /> Híbrido
            </label>
            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: '400', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: 'auto' }} /> Presencial
            </label>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ marginBottom: '0.5rem', display: 'block' }}>Categoría</label>
            <select style={{ backgroundColor: 'var(--bg-app)' }}>
              <option>Todas las categorías</option>
              <option>Tecnología y Sistemas</option>
              <option>Diseño y Creatividad</option>
              <option>Ventas y Marketing</option>
              <option>Administración</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ marginBottom: '0.5rem', display: 'block' }}>Rango Salarial</label>
            <select style={{ backgroundColor: 'var(--bg-app)' }}>
              <option>Cualquier salario</option>
              <option>Más de $500</option>
              <option>Más de $1,000</option>
              <option>Más de $2,000</option>
            </select>
          </div>
        </aside>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>Resultados (142)</h2>
            <select style={{ width: 'auto', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <option>Más recientes</option>
              <option>Mayor salario</option>
            </select>
          </div>

          <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(128, 0, 32, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary)', flexShrink: 0 }}>
              T
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge badge-remote">Remoto</span>
                <span className="badge badge-active">Tiempo Completo</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>Desarrollador Full Stack React & Node</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>Tech Solutions S.A. • San Salvador</p>
            </div>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end', flexShrink: 0 }}>
              <span style={{ fontWeight: '700', color: 'var(--success)', fontSize: '1.1rem' }}>$1,500 - $2,000</span>
              <Link to="/login" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>Ver Detalles</Link>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: '#F3F4F6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: '700', color: '#4B5563', flexShrink: 0 }}>
              D
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge" style={{ backgroundColor: '#E5E7EB', color: '#374151' }}>Híbrido</span>
                <span className="badge badge-active">Medio Tiempo</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>Diseñador UX/UI Junior</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>Digital Agency • Santa Ana</p>
            </div>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end', flexShrink: 0 }}>
              <span style={{ fontWeight: '700', color: 'var(--success)', fontSize: '1.1rem' }}>$600 - $800</span>
              <Link to="/login" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>Ver Detalles</Link>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem', opacity: '0.7' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: '#FEE2E2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: '700', color: 'var(--danger)', flexShrink: 0 }}>
              G
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge badge-closed">Cerrada</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>Gerente de Proyectos (IT)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>Global Corp • Presencial</p>
            </div>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end', flexShrink: 0 }}>
              <span style={{ fontWeight: '700', color: 'var(--text-muted)', fontSize: '1.1rem' }}>Salario a convenir</span>
              <button className="btn btn-outline" disabled style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', cursor: 'not-allowed' }}>No disponible</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;