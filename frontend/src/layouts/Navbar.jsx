import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="glass-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}>
          PortalEmpleos
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/login" className="btn btn-outline">
          Iniciar Sesión
        </Link>
        <Link to="/Registro" className="btn btn-primary">
          Registrarse
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;