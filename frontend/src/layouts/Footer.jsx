import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderTop: '1px solid var(--border)', marginTop: 'auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>PortalEmpleos</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Encuentra tu trabajo ideal con nosotros.</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.9rem' }}>
        <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Inicio</Link>
        <Link to="/empleos" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Empleos</Link>
      </div>
      <div style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        © 2026 PortalEmpleos. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;