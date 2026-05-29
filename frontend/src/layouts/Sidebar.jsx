import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside style={{ width: '260px', backgroundColor: 'var(--bg-card)', borderRight: '1px solid var(--border)', height: 'calc(100vh - 70px)', position: 'sticky', top: '70px', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link to="/dashboard" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', backgroundColor: 'rgba(128, 0, 32, 0.05)', color: 'var(--primary)' }}>
          PANEL PRINCIPAL
        </Link>
        <Link to="/dashboard/perfil" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
          MI PERFIL
        </Link>
        <Link to="/dashboard/postulaciones" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
           MIS POSTULACIONES
        </Link>
        <Link to="/dashboard/notificaciones" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
           NOTIFICACIONES
        </Link>
      </div>

      <div>
        <Link to="/" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--danger)', width: '100%' }}>
           CERRAR SESIÓN
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;