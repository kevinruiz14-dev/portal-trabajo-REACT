import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const PALETTE = {
  primary: '#800020',
  primaryHover: '#5E0017',
  bg: '#F9FAFB',
  surface: '#FFFFFF',
  textMain: '#111827',
  textMuted: '#6B7280',
  border: '#E5E7EB',
};

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    backgroundColor: PALETTE.bg,
    minHeight: '100vh',
  },

  // HERO
  hero: {
    background: 'linear-gradient(135deg, #800020 0%, #5E0017 60%, #3a000e 100%)',
    borderRadius: '20px',
    padding: '4rem 2.5rem 3.5rem',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(128,0,32,0.22)',
    position: 'relative',
    overflow: 'hidden',
    margin: '1.5rem 1.5rem 0',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '999px',
    padding: '0.35rem 1rem',
    fontSize: '0.78rem',
    fontWeight: '500',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    marginBottom: '1.5rem',
  },
  heroH1: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '0.85rem',
    color: '#fff',
    letterSpacing: '-0.01em',
  },
  heroP: {
    fontSize: '1.05rem',
    opacity: '0.82',
    marginBottom: '2.2rem',
    fontWeight: '300',
  },
  searchBar: {
    display: 'flex',
    gap: '0.6rem',
    maxWidth: '760px',
    margin: '0 auto',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.22)',
    borderRadius: '14px',
    padding: '0.5rem',
    flexWrap: 'wrap',
  },
  searchInput: {
    flex: '1',
    minWidth: '180px',
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    padding: '0.85rem 1.2rem',
    fontSize: '0.92rem',
    color: '#fff',
    outline: 'none',
    fontFamily: 'inherit',
  },
  searchBtn: {
    background: '#fff',
    color: PALETTE.primary,
    border: 'none',
    borderRadius: '10px',
    padding: '0.85rem 2rem',
    fontSize: '0.92rem',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
    transition: 'all 0.18s ease',
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2.5rem',
    marginTop: '2.5rem',
    flexWrap: 'wrap',
  },
  heroStat: { textAlign: 'center' },
  heroStatNum: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '1.7rem',
    fontWeight: '700',
    color: '#ffb3b3',
  },
  heroStatLbl: {
    fontSize: '0.75rem',
    opacity: '0.65',
    fontWeight: '400',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },

  // LAYOUT
  layout: {
    display: 'flex',
    gap: '1.5rem',
    padding: '1.5rem',
    alignItems: 'flex-start',
  },

  // SIDEBAR
  sidebar: {
    width: '260px',
    flexShrink: '0',
    background: PALETTE.surface,
    border: `1px solid ${PALETTE.border}`,
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04)',
    position: 'sticky',
    top: '90px',
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: `1px solid ${PALETTE.border}`,
  },
  sidebarTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '1.05rem',
    fontWeight: '600',
    margin: 0,
  },
  clearBtn: {
    fontSize: '0.78rem',
    color: PALETTE.primary,
    cursor: 'pointer',
    fontWeight: '600',
    background: 'none',
    border: 'none',
    padding: '0',
    fontFamily: 'inherit',
  },
  filterSection: { marginBottom: '1.5rem' },
  filterLabel: {
    fontSize: '0.72rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: PALETTE.textMuted,
    marginBottom: '0.75rem',
    display: 'block',
  },
  checkboxItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginBottom: '0.55rem',
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '0.875rem',
    color: PALETTE.textMain,
    fontWeight: '400',
  },

  // MAIN
  mainContent: { flex: 1 },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  resultsTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '1.35rem',
    fontWeight: '600',
    margin: 0,
  },
  resultsBadge: {
    fontFamily: 'inherit',
    fontSize: '0.82rem',
    fontWeight: '500',
    color: PALETTE.textMuted,
    background: PALETTE.bg,
    border: `1px solid ${PALETTE.border}`,
    padding: '0.2rem 0.65rem',
    borderRadius: '999px',
    marginLeft: '0.5rem',
  },
  sortSelect: {
    fontFamily: 'inherit',
    fontSize: '0.82rem',
    color: PALETTE.textMuted,
    border: `1px solid ${PALETTE.border}`,
    borderRadius: '8px',
    padding: '0.4rem 0.8rem',
    background: PALETTE.surface,
    cursor: 'pointer',
    outline: 'none',
  },
  jobsList: { display: 'flex', flexDirection: 'column', gap: '0.9rem' },

  // EMPTY STATE
  emptyState: {
    background: PALETTE.surface,
    border: `1.5px dashed ${PALETTE.border}`,
    borderRadius: '16px',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '72px',
    height: '72px',
    background: 'linear-gradient(135deg, #fff0f2, #ffe0e4)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.25rem',
    fontSize: '1.8rem',
    boxShadow: '0 4px 12px rgba(128,0,32,0.1)',
  },
  emptyH3: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: PALETTE.textMain,
  },
  emptyP: {
    fontSize: '0.9rem',
    color: PALETTE.textMuted,
    maxWidth: '340px',
    margin: '0 auto 1.5rem',
    lineHeight: '1.6',
  },

  // JOB CARD
  jobCard: {
    background: PALETTE.surface,
    border: `1px solid ${PALETTE.border}`,
    borderRadius: '14px',
    padding: '1.4rem 1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' },
  companyLogo: {
    width: '44px', height: '44px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #fff0f2, #ffe0e4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.2rem', flexShrink: 0,
    border: `1px solid ${PALETTE.border}`,
  },
  cardInfo: { flex: 1 },
  jobTitle: { fontWeight: '600', fontSize: '0.97rem', color: PALETTE.textMain, marginBottom: '0.25rem' },
  companyName: { fontSize: '0.83rem', color: PALETTE.textMuted },
  badgeNew: {
    background: '#fff0f2', color: PALETTE.primary,
    border: '1px solid #f5c0c8',
    fontSize: '0.7rem', fontWeight: '600',
    padding: '0.2rem 0.6rem', borderRadius: '999px',
    textTransform: 'uppercase', letterSpacing: '0.04em', flexShrink: 0,
  },
  cardTags: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.85rem' },
  cardTag: {
    fontSize: '0.75rem', padding: '0.22rem 0.65rem',
    borderRadius: '999px', background: PALETTE.bg,
    border: `1px solid ${PALETTE.border}`, color: PALETTE.textMuted, fontWeight: '500',
  },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  salary: { fontSize: '0.88rem', fontWeight: '600', color: PALETTE.primary },
  posted: { fontSize: '0.77rem', color: PALETTE.textMuted },

  btnPrimary: {
    background: PALETTE.primary, color: 'white', border: 'none',
    borderRadius: '10px', padding: '0.75rem 1.75rem',
    fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer',
    fontFamily: 'inherit', transition: 'all 0.18s ease',
  },
  modalOverlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    padding: '1rem'
  },
  modalContent: {
    backgroundColor: PALETTE.surface, borderRadius: '16px', padding: '2rem',
    width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto',
    position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
  },
  closeBtn: {
    position: 'absolute', top: '1.2rem', right: '1.5rem',
    background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer',
    color: PALETTE.textMuted, fontWeight: 'bold'
  },
};

const JobCard = ({ empleo, onClick }) => (
  <div style={styles.jobCard}
    onClick={onClick}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#f0b0bb'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(128,0,32,0.1)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = PALETTE.border; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = styles.jobCard.boxShadow; }}
  >
    <div style={styles.cardTop}>
      <div style={styles.cardInfo}>
        <div style={styles.jobTitle}>{empleo.titulo}</div>
        <div style={styles.companyName}>{empleo.nombre_empresa || 'Empresa'} · {empleo.ubicacion || 'No especificada'}</div>
      </div>
    </div>
    <div style={styles.cardTags}>
      {empleo.modalidad && <span style={{ ...styles.cardTag, textTransform: 'capitalize' }}>{empleo.modalidad}</span>}
      {empleo.tipo_contrato && <span style={{ ...styles.cardTag, textTransform: 'capitalize' }}>{empleo.tipo_contrato.replace('_', ' ')}</span>}
      {empleo.area && <span style={{ ...styles.cardTag, textTransform: 'capitalize' }}>{empleo.area}</span>}
    </div>
    <p style={{ fontSize: '0.85rem', color: PALETTE.textMuted, marginBottom: '1rem' }}>
      {empleo.descripcion ? (empleo.descripcion.substring(0, 100) + '...') : 'Sin descripción'}
    </p>
    <div style={styles.cardFooter}>
      <span style={styles.salary}>{empleo.salario ? `$${empleo.salario}` : 'No especificado'}</span>
      <span style={styles.posted}>{empleo.creada_en ? new Date(empleo.creada_en).toLocaleDateString() : ''}</span>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const [selectedJob, setSelectedJob] = useState(null);
  const [aplicando, setAplicando] = useState(false);

  const [empleos, setEmpleos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [areasActivas, setAreasActivas] = useState([]);
  const [modalidadesActivas, setModalidadesActivas] = useState([]);
  const [contratosActivos, setContratosActivos] = useState([]);
  const [orden, setOrden] = useState('Más recientes');

  const [areasDisponibles, setAreasDisponibles] = useState([]);
  const [modalidadesDisponibles, setModalidadesDisponibles] = useState([]);
  const [contratosDisponibles, setContratosDisponibles] = useState([]);

  useEffect(() => {
    const obtenerOfertas = async () => {
      try {
        const response = await API.get("/ofertas");
        const data = response.data.data || response.data || [];
        setEmpleos(data);

        const areas = [...new Set(data.map(e => e.area).filter(Boolean))];
        const modalidades = [...new Set(data.map(e => e.modalidad).filter(Boolean))];
        const contratos = [...new Set(data.map(e => e.tipo_contrato).filter(Boolean))];

        setAreasDisponibles(areas);
        setModalidadesDisponibles(modalidades);
        setContratosDisponibles(contratos);
      } catch (error) {
        console.error("Error cargando ofertas:", error);
      }
    };
    obtenerOfertas();
  }, []);

  const handleAplicar = async () => {
    if (!user) {
      alert("Debes iniciar sesión para aplicar a una oferta.");
      navigate("/login");
      return;
    }
    try {
      setAplicando(true);
      await API.post("/aplicaciones", {
        oferta_id: selectedJob.oferta_id || selectedJob.id,
        usuario_id: user.usuario_id,
        empresa_id: selectedJob.empresa_id || selectedJob.usuario_id
      });
      alert("Aplicación enviada con éxito");
      setSelectedJob(null);
    } catch (error) {
      console.error("Error al aplicar:", error);
      alert(error.response?.data?.error || error.response?.data?.mensaje || error.response?.data?.message || "Error al procesar la aplicación");
    } finally {
      setAplicando(false);
    }
  };

  const toggleFiltro = (valor, activos, setActivos) => {
    setActivos(prev => prev.includes(valor) ? prev.filter(v => v !== valor) : [...prev, valor]);
  };

  const empleosFiltrados = empleos.filter(empleo => {
    const matchBusqueda = (empleo.titulo || '').toLowerCase().includes(busqueda.toLowerCase()) ||
                          (empleo.nombre_empresa || '').toLowerCase().includes(busqueda.toLowerCase());
    const matchUbicacion = (empleo.ubicacion || '').toLowerCase().includes(ubicacion.toLowerCase());

    const matchArea = areasActivas.length === 0 || areasActivas.includes(empleo.area);
    const matchModalidad = modalidadesActivas.length === 0 || modalidadesActivas.includes(empleo.modalidad);
    const matchContrato = contratosActivos.length === 0 || contratosActivos.includes(empleo.tipo_contrato);

    return matchBusqueda && matchUbicacion && matchArea && matchModalidad && matchContrato;
  }).sort((a, b) => {
    if (orden === 'Más recientes') {
      return new Date(b.creada_en || 0) - new Date(a.creada_en || 0);
    }
    if (orden === 'Mejor salario') {
      return (parseFloat(b.salario) || 0) - (parseFloat(a.salario) || 0);
    }
    return 0;
  });

  return (
    <div style={styles.page}>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroBadge}>✦ Portal de Empleo · El Salvador</div>
        <h1 style={styles.heroH1}>Encuentra tu próximo empleo</h1>
        <p style={styles.heroP}>Miles de oportunidades en las mejores empresas te esperan</p>

        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Cargo, palabra clave o empresa..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={styles.searchInput}
          />
          <input
            type="text"
            placeholder="Ubicación..."
            value={ubicacion}
            onChange={e => setUbicacion(e.target.value)}
            style={{ ...styles.searchInput, maxWidth: '200px' }}
          />
          <button style={styles.searchBtn}
            onMouseEnter={e => { e.currentTarget.style.background = '#f5e8ea'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            Buscar
          </button>
        </div>

       
      </section>

      {}
      <div style={styles.layout}>

        {}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <h3 style={styles.sidebarTitle}>Filtros</h3>
            <button style={styles.clearBtn} onClick={() => { setAreasActivas([]); setModalidadesActivas([]); setContratosActivos([]); setBusqueda(''); setUbicacion(''); setOrden('Más recientes'); }}>Limpiar todo</button>
          </div>

          <div style={styles.filterSection}>
            <span style={styles.filterLabel}>Modalidad</span>
            {modalidadesDisponibles.length > 0 ? modalidadesDisponibles.map(m => (
              <label key={m} style={styles.checkboxItem}>
                <input type="checkbox" checked={modalidadesActivas.includes(m)} onChange={() => toggleFiltro(m, modalidadesActivas, setModalidadesActivas)} style={{ accentColor: PALETTE.primary, width: '15px', height: '15px', cursor: 'pointer' }} />
                <span style={{ ...styles.checkboxLabel, textTransform: 'capitalize' }}>{m}</span>
              </label>
            )) : <span style={{ fontSize: '0.8rem', color: PALETTE.textMuted }}>No hay modalidades</span>}
          </div>

          <div style={styles.filterSection}>
            <span style={styles.filterLabel}>Tipo de contrato</span>
            {contratosDisponibles.length > 0 ? contratosDisponibles.map(t => (
              <label key={t} style={styles.checkboxItem}>
                <input type="checkbox" checked={contratosActivos.includes(t)} onChange={() => toggleFiltro(t, contratosActivos, setContratosActivos)} style={{ accentColor: PALETTE.primary, width: '15px', height: '15px', cursor: 'pointer' }} />
                <span style={{ ...styles.checkboxLabel, textTransform: 'capitalize' }}>{t.replace('_', ' ')}</span>
              </label>
            )) : <span style={{ fontSize: '0.8rem', color: PALETTE.textMuted }}>No hay contratos</span>}
          </div>

          <div style={styles.filterSection}>
            <span style={styles.filterLabel}>Área</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {areasDisponibles.length > 0 ? areasDisponibles.map(area => (
                <span
                  key={area}
                  onClick={() => toggleFiltro(area, areasActivas, setAreasActivas)}
                  style={{
                    display: 'inline-block',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '999px',
                    fontSize: '0.78rem',
                    fontWeight: '500',
                    border: `1px solid ${areasActivas.includes(area) ? '#f0b0bb' : PALETTE.border}`,
                    cursor: 'pointer',
                    background: areasActivas.includes(area) ? '#fff0f2' : PALETTE.bg,
                    color: areasActivas.includes(area) ? PALETTE.primary : PALETTE.textMuted,
                    transition: 'all 0.15s',
                  }}
                >{area}</span>
              )) : <span style={{ fontSize: '0.8rem', color: PALETTE.textMuted }}>No hay áreas</span>}
            </div>
          </div>
        </aside>

        {}
        <main style={styles.mainContent}>
          <div style={styles.resultsHeader}>
            <h2 style={styles.resultsTitle}>
              Resultados
              <span style={styles.resultsBadge}>{empleosFiltrados.length} empleos</span>
            </h2>
            <select style={styles.sortSelect} value={orden} onChange={e => setOrden(e.target.value)}>
              <option value="Más recientes">Más recientes</option>
              <option value="Mejor salario">Mejor salario</option>
              <option value="Más relevantes">Más relevantes</option>
            </select>
          </div>

          <div style={styles.jobsList}>
            {empleosFiltrados.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}></div>
                <h3 style={styles.emptyH3}>Aún no hay empleos publicados</h3>
                <p style={styles.emptyP}>No se encontraron resultados para tu búsqueda o filtros actuales.</p>
                <button style={styles.btnPrimary}
                  onClick={() => { setAreasActivas([]); setModalidadesActivas([]); setContratosActivos([]); setBusqueda(''); setUbicacion(''); setOrden('Más recientes'); }}
                  onMouseEnter={e => { e.currentTarget.style.background = PALETTE.primaryHover; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = PALETTE.primary; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  Limpiar Búsqueda
                </button>
              </div>
            ) : (
              empleosFiltrados.map(empleo => <JobCard key={empleo.oferta_id || empleo.id} empleo={empleo} onClick={() => setSelectedJob(empleo)} />)
            )}
          </div>
        </main>
      </div>

      {selectedJob && (
        <div style={styles.modalOverlay} onClick={() => setSelectedJob(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedJob(null)}>X</button>
            <h2 style={{...styles.resultsTitle, marginBottom: '0.5rem'}}>{selectedJob.titulo}</h2>
            <p style={styles.companyName}>{selectedJob.nombre_empresa || 'Empresa'} · {selectedJob.ubicacion || 'No especificada'}</p>
            
            <div style={{...styles.cardTags, marginTop: '1rem'}}>
              {selectedJob.modalidad && <span style={{ ...styles.cardTag, textTransform: 'capitalize' }}>{selectedJob.modalidad}</span>}
              {selectedJob.tipo_contrato && <span style={{ ...styles.cardTag, textTransform: 'capitalize' }}>{selectedJob.tipo_contrato.replace('_', ' ')}</span>}
              {selectedJob.area && <span style={{ ...styles.cardTag, textTransform: 'capitalize' }}>{selectedJob.area}</span>}
            </div>
            
            <p style={{...styles.salary, marginTop: '1rem'}}>{selectedJob.salario ? `$${selectedJob.salario}` : 'Salario no especificado'}</p>
            
            <h4 style={{marginTop: '1.5rem', marginBottom: '0.5rem', color: PALETTE.textMain}}>Descripción</h4>
            <p style={{color: PALETTE.textMuted, fontSize: '0.9rem', lineHeight: '1.6'}}>{selectedJob.descripcion}</p>
            
            {selectedJob.requisitos && (
              <>
                <h4 style={{marginTop: '1.5rem', marginBottom: '0.5rem', color: PALETTE.textMain}}>Requisitos</h4>
                <p style={{color: PALETTE.textMuted, fontSize: '0.9rem', lineHeight: '1.6'}}>{selectedJob.requisitos}</p>
              </>
            )}

            <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'flex-end'}}>
              <button style={{...styles.btnPrimary, opacity: aplicando ? 0.7 : 1}} disabled={aplicando} onClick={handleAplicar}>
                {aplicando ? 'Enviando...' : 'Aplicar a esta oferta'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;