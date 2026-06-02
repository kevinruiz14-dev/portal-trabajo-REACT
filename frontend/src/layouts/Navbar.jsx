import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import API from '../services/api';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificacionesOpen, setNotificacionesOpen] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  useEffect(() => {
    if (user && user.usuario_id) {
      if (String(user.rol).toLowerCase().trim() === 'empresa') {
        API.get(`/aplicaciones/empresa/${user.usuario_id}`)
          .then(res => {
            const data = res.data.data || res.data || [];
            const pendientes = data.filter(app => app.estado === 'pendiente' || app.estado === 'Pendiente');
            setNotificaciones(pendientes);
          })
          .catch(err => console.error(err));
      } else {
        API.get(`/aplicaciones/usuario/${user.usuario_id}`)
          .then(res => {
            const data = res.data.data || res.data || [];
            const aceptadas = data.filter(app => app.estado === 'aceptada' || app.estado === 'Aceptada');
            setNotificaciones(aceptadas);
          })
          .catch(err => console.error(err));
      }
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    setNotificacionesOpen(false);
    navigate('/');
  };

  return (
    <nav className="glass-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}>
          CherryTreeJob
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <div style={{ position: 'relative' }}>
              <button 
                className="btn btn-outline" 
                onClick={() => { setNotificacionesOpen(!notificacionesOpen); setDropdownOpen(false); }}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                Notificaciones
                {notificaciones.length > 0 && (
                  <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                    {notificaciones.length}
                  </span>
                )}
              </button>
              {notificacionesOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem',
                  backgroundColor: 'var(--bg-card, white)', border: '1px solid var(--border, #ccc)',
                  borderRadius: '8px', display: 'flex', flexDirection: 'column',
                  minWidth: '250px', zIndex: 1000, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border, #ccc)', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>
                    Tus Notificaciones
                  </div>
                  {notificaciones.length > 0 ? (
                    String(user.rol).toLowerCase().trim() === 'empresa' ? (
                      <>
                        {notificaciones.map((notif, index) => (
                          <div key={index} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border, #eee)', fontSize: '0.85rem' }}>
                            <strong>{notif.nombre_postulante || 'Un candidato'}</strong> envió una solicitud para <strong>{notif.titulo_oferta || 'tu oferta'}</strong>.
                          </div>
                        ))}
                        <div style={{ padding: '0.75rem 1rem', textAlign: 'center', backgroundColor: '#f9fafb' }}>
                          <Link to="/empresa/dashboard" onClick={() => setNotificacionesOpen(false)} style={{ color: 'var(--primary, #800020)', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>
                            Ver todas las solicitudes
                          </Link>
                        </div>
                      </>
                    ) : (
                      notificaciones.map((notif, index) => (
                        <div key={index} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border, #eee)', fontSize: '0.85rem' }}>
                          Tu aplicación para <strong>{notif.titulo_oferta || 'una oferta'}</strong> ha sido aceptada.
                        </div>
                      ))
                    )
                  ) : (
                    <div style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#666' }}>
                      No tienes notificaciones nuevas.
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => { setDropdownOpen(!dropdownOpen); setNotificacionesOpen(false); }}
              style={{ cursor: 'pointer' }}
            >
              {user.nombre}
            </button>
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.5rem',
                backgroundColor: 'var(--bg-card, white)',
                border: '1px solid var(--border, #ccc)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                minWidth: '150px',
                zIndex: 1000,
                overflow: 'hidden'
              }}>
                {String(user.rol).toLowerCase().trim() !== 'empresa' && (
                  <Link 
                    to="/perfil" 
                    style={{ padding: '0.75rem 1rem', textDecoration: 'none', color: 'var(--text-main, #333)', borderBottom: '1px solid var(--border, #ccc)' }}
                    onClick={() => setDropdownOpen(false)}
                  >
                    Perfil
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  style={{ padding: '0.75rem 1rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: 'var(--danger, red)', width: '100%', fontSize: '1rem' }}
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="btn btn-primary">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;