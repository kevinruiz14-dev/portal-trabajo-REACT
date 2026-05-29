import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Aquí se guardarán los empleos reales que vengan de la base de datos
  const [empleos, setEmpleos] = useState([]);

  useEffect(() => {
    // Simulación de la llamada al backend. 
    // Cuando el backend esté listo, aquí usarán axios.get('http://localhost:tu-puerto/api/empleos')
    const cargarEmpleos = () => {
      const datosBaseDeDatos = [
        {
          id: 1,
          titulo: "Desarrollador Full Stack React & Node",
          empresa: "Tech Solutions S.A.",
          ubicacion: "San Salvador",
          salario: "$1,500 - $2,000",
          modalidad: "Remoto",
          tipo: "Tiempo Completo",
          estado: "abierto",
          letra: "T",
          color: "rgba(128, 0, 32, 0.1)",
          textColor: "var(--primary)"
        },
        {
          id: 2,
          titulo: "Diseñador UX/UI Junior",
          empresa: "Digital Agency",
          ubicacion: "Santa Ana",
          salario: "$600 - $800",
          modalidad: "Híbrido",
          tipo: "Medio Tiempo",
          estado: "abierto",
          letra: "D",
          color: "#F3F4F6",
          textColor: "#4B5563"
        },
        {
          id: 3,
          titulo: "Gerente de Proyectos (IT)",
          empresa: "Global Corp",
          ubicacion: "Presencial",
          salario: "Salario a convenir",
          modalidad: "Presencial",
          tipo: "Tiempo Completo",
          estado: "cerrado",
          letra: "G",
          color: "#FEE2E2",
          textColor: "var(--danger)"
        }
      ];
      setEmpleos(datosBaseDeDatos);
    };

    cargarEmpleos();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Buscador Principal */}
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

        {/* Lista Dinámica de Empleos */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>Resultados ({empleos.length})</h2>
          </div>

          {/* Aquí React recorre la base de datos y dibuja una tarjeta por cada empleo */}
          {empleos.map((empleo) => (
            <div key={empleo.id} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem', opacity: empleo.estado === 'cerrado' ? '0.7' : '1' }}>
              
              <div style={{ width: '64px', height: '64px', backgroundColor: empleo.color, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: '700', color: empleo.textColor, flexShrink: 0 }}>
                {empleo.letra}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  {empleo.estado === 'cerrado' ? (
                    <span className="badge badge-closed">Cerrada</span>
                  ) : (
                    <>
                      <span className={empleo.modalidad === 'Remoto' ? 'badge badge-remote' : 'badge'} style={empleo.modalidad !== 'Remoto' ? {backgroundColor: '#E5E7EB', color: '#374151'} : {}}>
                        {empleo.modalidad}
                      </span>
                      <span className="badge badge-active">{empleo.tipo}</span>
                    </>
                  )}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>{empleo.titulo}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>{empleo.empresa} • {empleo.ubicacion}</p>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end', flexShrink: 0 }}>
                <span style={{ fontWeight: '700', color: empleo.estado === 'cerrado' ? 'var(--text-muted)' : 'var(--success)', fontSize: '1.1rem' }}>
                  {empleo.salario}
                </span>
                
                {empleo.estado === 'cerrado' ? (
                  <button className="btn btn-outline" disabled style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', cursor: 'not-allowed' }}>No disponible</button>
                ) : (
                  <Link to="/login" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>Ver Detalles</Link>
                )}
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Home;