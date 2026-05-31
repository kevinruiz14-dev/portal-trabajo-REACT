import { useState, useEffect } from 'react';

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
};

const AREAS = ['Tecnología', 'Marketing', 'Finanzas', 'Diseño', 'Ventas', 'RR.HH.'];

const JobCard = ({ empleo }) => (
  <div style={styles.jobCard}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#f0b0bb'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(128,0,32,0.1)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = PALETTE.border; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = styles.jobCard.boxShadow; }}
  >
    <div style={styles.cardTop}>
      <div style={styles.companyLogo}>{empleo.icon || '💼'}</div>
      <div style={styles.cardInfo}>
        <div style={styles.jobTitle}>{empleo.titulo}</div>
        <div style={styles.companyName}>{empleo.empresa} · {empleo.ubicacion}</div>
      </div>
      {empleo.nuevo && <span style={styles.badgeNew}>Nuevo</span>}
    </div>
    <div style={styles.cardTags}>
      {(empleo.tags || []).map(tag => <span key={tag} style={styles.cardTag}>{tag}</span>)}
    </div>
    <div style={styles.cardFooter}>
      <span style={styles.salary}>{empleo.salario}</span>
      <span style={styles.posted}>{empleo.fecha}</span>
    </div>
  </div>
);

const Home = () => {
  const [empleos, setEmpleos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [areasActivas, setAreasActivas] = useState([]);

  useEffect(() => {
    // TODO: fetch('/api/empleos/').then(r => r.json()).then(setEmpleos)
  }, []);

  const toggleArea = (area) =>
    setAreasActivas(prev => prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]);

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
            placeholder="🔍  Cargo, palabra clave o empresa..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={styles.searchInput}
          />
          <input
            type="text"
            placeholder="📍  Ubicación..."
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
            <button style={styles.clearBtn}>Limpiar todo</button>
          </div>

          <div style={styles.filterSection}>
            <span style={styles.filterLabel}>Modalidad</span>
            {['Remoto', 'Híbrido', 'Presencial'].map(m => (
              <label key={m} style={styles.checkboxItem}>
                <input type="checkbox" style={{ accentColor: PALETTE.primary, width: '15px', height: '15px', cursor: 'pointer' }} />
                <span style={styles.checkboxLabel}>{m}</span>
              </label>
            ))}
          </div>

          <div style={styles.filterSection}>
            <span style={styles.filterLabel}>Tipo de contrato</span>
            {['Tiempo completo', 'Medio tiempo', 'Freelance'].map(t => (
              <label key={t} style={styles.checkboxItem}>
                <input type="checkbox" style={{ accentColor: PALETTE.primary, width: '15px', height: '15px', cursor: 'pointer' }} />
                <span style={styles.checkboxLabel}>{t}</span>
              </label>
            ))}
          </div>

          <div style={styles.filterSection}>
            <span style={styles.filterLabel}>Área</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {AREAS.map(area => (
                <span
                  key={area}
                  onClick={() => toggleArea(area)}
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
              ))}
            </div>
          </div>
        </aside>

        {}
        <main style={styles.mainContent}>
          <div style={styles.resultsHeader}>
            <h2 style={styles.resultsTitle}>
              Resultados
              <span style={styles.resultsBadge}>{empleos.length} empleos</span>
            </h2>
            <select style={styles.sortSelect}>
              <option>Más recientes</option>
              <option>Mejor salario</option>
              <option>Más relevantes</option>
            </select>
          </div>

          <div style={styles.jobsList}>
            {empleos.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>🔍</div>
                <h3 style={styles.emptyH3}>Aún no hay empleos publicados</h3>
                <p style={styles.emptyP}>Los resultados aparecerán aquí una vez que la base de datos esté conectada.</p>
                <button style={styles.btnPrimary}
                  onMouseEnter={e => { e.currentTarget.style.background = PALETTE.primaryHover; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = PALETTE.primary; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  Publicar un empleo
                </button>
              </div>
            ) : (
              empleos.map(empleo => <JobCard key={empleo.id} empleo={empleo} />)
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;