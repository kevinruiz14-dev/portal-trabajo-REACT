import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function DashboardEmpresa() {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("ofertasActivas");
  const [ofertas, setOfertas] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  
  const [editingOferta, setEditingOferta] = useState(null);

  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [postulanteDetalle, setPostulanteDetalle] = useState(null);
  const [loadingDetalle, setLoadingDetalle] = useState(false);
  
  const [nuevaOferta, setNuevaOferta] = useState({
    titulo: "", descripcion: "", requisitos: "", salario: "", modalidad: "", tipo_contrato: "", area: ""
  });

  const [empresaData, setEmpresaData] = useState({
    nombre: user?.nombre || "",
    telefono: user?.telefono || "",
    resumen_profesional: user?.resumen_profesional || "",
    password: ""
  });

  useEffect(() => {
    if (!user || String(user.rol).toLowerCase().trim() !== "empresa") {
      navigate("/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const resOfertas = await API.get("/ofertas");
        const allOfertas = resOfertas.data.data || resOfertas.data || [];
        const userOfertas = allOfertas.filter(o => 
          (user.empresa_id && o.empresa_id === user.empresa_id) || 
          (user.usuario_id && o.usuario_id === user.usuario_id)
        );
        setOfertas(userOfertas);

        const empId = user.empresa_id || (userOfertas.length > 0 ? userOfertas[0].empresa_id : null);
        let apps = [];
        try {
          if (empId) {
            const resSolicitudes = await API.get(`/aplicaciones/empresa/${empId}`);
            apps = resSolicitudes.data.data || resSolicitudes.data || [];
          }
        } catch (error) {
          console.warn("Fallo al obtener aplicaciones por empresa, intentando búsqueda global...");
        }

        if (apps.length === 0 && userOfertas.length > 0) {
          try {
            const resAllApps = await API.get("/aplicaciones");
            const allApps = resAllApps.data.data || resAllApps.data || [];
            const misOfertaIds = userOfertas.map(o => o.oferta_id || o.id);
            apps = allApps.filter(a => misOfertaIds.includes(a.oferta_id));
          } catch (error) {
            console.error("Error al cargar todas las aplicaciones:", error);
          }
        }
        setSolicitudes(apps);
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
      }
    };

    fetchDashboardData();
  }, [user, navigate]);

  const handleCrearOferta = async (e) => {
    e.preventDefault();
    try {
      const ofertaData = { 
        ...nuevaOferta, 
        empresa_id: user.empresa_id || null,
        usuario_id: user.usuario_id,
        activa: true
      };
      
      if (ofertaData.salario === "") {
        ofertaData.salario = null;
      }

      await API.post("/ofertas", ofertaData);
      alert("Oferta publicada exitosamente");
      setNuevaOferta({ titulo: "", descripcion: "", requisitos: "", salario: "", modalidad: "", tipo_contrato: "", area: "" });
      
      const resOfertas = await API.get("/ofertas");
      const allOfertas = resOfertas.data.data || resOfertas.data || [];
      setOfertas(allOfertas.filter(o => 
        (user.empresa_id && o.empresa_id === user.empresa_id) || 
        (user.usuario_id && o.usuario_id === user.usuario_id)
      ));
      
      setActiveTab("ofertasActivas");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detalle || error.response?.data?.error || "Error al publicar la oferta");
    }
  };

  const handleActualizarOferta = async (e) => {
    e.preventDefault();
    try {
      const ofertaActualizada = { ...editingOferta };
      if (ofertaActualizada.salario === "") {
        ofertaActualizada.salario = null;
      }

      await API.put(`/ofertas/${editingOferta.oferta_id || editingOferta.id}`, ofertaActualizada);
      alert("Oferta actualizada exitosamente");
      setEditingOferta(null);
      
      const resOfertas = await API.get("/ofertas");
      const allOfertas = resOfertas.data.data || resOfertas.data || [];
      setOfertas(allOfertas.filter(o => 
        (user.empresa_id && o.empresa_id === user.empresa_id) || 
        (user.usuario_id && o.usuario_id === user.usuario_id)
      ));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detalle || error.response?.data?.error || "Error al actualizar la oferta");
    }
  };

  const handleActualizarEmpresa = async (e) => {
    e.preventDefault();
    try {
      const body = {
        ...user,
        nombre: empresaData.nombre,
        telefono: empresaData.telefono,
        resumen_profesional: empresaData.resumen_profesional
      };
      if (empresaData.password) {
        body.password = empresaData.password;
      }

      const response = await API.put(`/usuarios/${user.usuario_id}`, body);
      const { password_hash, ...usuarioParaGuardar } = response.data.usuario || response.data;
      
      localStorage.setItem("user", JSON.stringify(usuarioParaGuardar));
      alert("Información de la empresa actualizada");
      setEmpresaData({ ...empresaData, password: "" });
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la información");
    }
  };

  const handleVerDetalle = async (solicitud) => {
    setSelectedSolicitud(solicitud);
    setPostulanteDetalle(null);
    setLoadingDetalle(true);
    try {
      const res = await API.get(`/usuarios/${solicitud.usuario_id}`);
      setPostulanteDetalle(res.data.data || res.data.usuario || res.data);
    } catch (error) {
      console.error("Error al cargar detalles del postulante:", error);
    } finally {
      setLoadingDetalle(false);
    }
  };

  const handleAceptarSolicitud = async () => {
    try {
      const appId = selectedSolicitud.aplicacion_id || selectedSolicitud.id;
      await API.put(`/aplicaciones/${appId}`, { estado: 'aceptada' });
      
      try {
        await API.post("/notificaciones", {
          usuario_id: selectedSolicitud.usuario_id,
          mensaje: `¡Felicidades! Tu postulación a la oferta "${selectedSolicitud.titulo_oferta || selectedSolicitud.oferta_id}" ha sido aceptada.`
        });
      } catch (err) {
        console.error("No se pudo enviar notificación al usuario:", err);
      }

      alert("Postulación aceptada y notificación enviada");
      setSolicitudes(solicitudes.map(s => 
        (s.aplicacion_id === appId || s.id === appId) ? { ...s, estado: 'aceptada' } : s
      ));
      setSelectedSolicitud(null);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || error.response?.data?.detalle || "Error al aceptar la postulación");
    }
  };

  const renderContent = () => {
    const checkActiva = (val) => {
      const str = String(val).toLowerCase();
      return str === "true" || str === "1" || val === true || val === 1;
    };

    const activas = ofertas.filter(o => checkActiva(o.activa));
    const inactivas = ofertas.filter(o => !checkActiva(o.activa));

    switch (activeTab) {
      case "ofertasActivas": 
        if (editingOferta) {
          return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "30px" }}>
                <h2 style={{ margin: 0, fontSize: "1.8rem", color: "#111827" }}>Editar Oferta</h2>
                <button onClick={() => setEditingOferta(null)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: "1rem", fontWeight: "600" }}>Volver</button>
              </div>
              <form onSubmit={handleActualizarOferta} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Título de la oferta</label>
                  <input type="text" value={editingOferta.titulo} onChange={e => setEditingOferta({...editingOferta, titulo: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }} required />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Área</label>
                  <input type="text" value={editingOferta.area} onChange={e => setEditingOferta({...editingOferta, area: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }} required />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Salario</label>
                  <input type="number" step="0.01" value={editingOferta.salario} onChange={e => setEditingOferta({...editingOferta, salario: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Modalidad</label>
                  <select value={editingOferta.modalidad} onChange={e => setEditingOferta({...editingOferta, modalidad: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem", backgroundColor: "#fff" }} required>
                    <option value="">Seleccione...</option>
                    <option value="presencial">Presencial</option>
                    <option value="remoto">Remoto</option>
                    <option value="hibrido">Híbrido</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Tipo de Contrato</label>
                  <select value={editingOferta.tipo_contrato} onChange={e => setEditingOferta({...editingOferta, tipo_contrato: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem", backgroundColor: "#fff" }} required>
                    <option value="">Seleccione...</option>
                    <option value="tiempo_completo">Tiempo Completo</option>
                    <option value="medio_tiempo">Medio Tiempo</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Descripción</label>
                  <textarea rows="5" value={editingOferta.descripcion} onChange={e => setEditingOferta({...editingOferta, descripcion: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }} required></textarea>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Requisitos</label>
                  <textarea rows="4" value={editingOferta.requisitos} onChange={e => setEditingOferta({...editingOferta, requisitos: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }}></textarea>
                </div>
                <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
          <input type="checkbox" id="activaCheck" checked={checkActiva(editingOferta.activa)} onChange={e => setEditingOferta({...editingOferta, activa: e.target.checked})} style={{ width: "20px", height: "20px", accentColor: "#800020", cursor: "pointer" }} />
                  <label htmlFor="activaCheck" style={{ fontWeight: "600", color: "#374151", cursor: "pointer" }}>Oferta Activa (Desmarcar para finalizarla)</label>
                </div>
                <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                  <button type="submit" style={{ padding: "14px 30px", background: "#800020", color: "white", border: "none", borderRadius: "14px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}>Guardar Cambios</button>
                </div>
              </form>
            </div>
          );
        }
        return (
          <div>
            <h2 style={{ marginBottom: "30px", fontSize: "1.8rem", color: "#111827" }}>Ofertas Activas</h2>
            {activas.length === 0 ? <p style={{ color: "#6B7280" }}>No tienes ofertas publicadas actualmente.</p> : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
                {activas.map(o => (
                  <div key={o.oferta_id || o.id} style={{ padding: "24px", border: "1px solid #E5E7EB", borderRadius: "20px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                    <div>
                      <h3 style={{ margin: "0 0 12px 0", color: "#111827", fontSize: "1.2rem" }}>{o.titulo}</h3>
                      <p style={{ margin: "0 0 8px 0", color: "#4B5563", fontSize: "0.95rem" }}>
                        <strong style={{ color: "#374151" }}>Área:</strong> {o.area}
                      </p>
                      <p style={{ margin: "0 0 16px 0", color: "#4B5563", fontSize: "0.95rem", textTransform: "capitalize" }}>
                        <strong style={{ color: "#374151" }}>Modalidad:</strong> {o.modalidad}
                      </p>
                    </div>
                    <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={{ margin: 0, fontWeight: "bold", color: "#800020", fontSize: "1.1rem" }}>${o.salario}</p>
                      <button onClick={() => setEditingOferta(o)} style={{ padding: "8px 16px", background: "#F3F4F6", color: "#374151", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600", transition: "0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "#E5E7EB"} onMouseLeave={e => e.currentTarget.style.background = "#F3F4F6"}>Editar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "solicitudes": 
        return (
          <div>
            <h2 style={{ marginBottom: "30px", fontSize: "1.8rem", color: "#111827" }}>Solicitudes de Postulaciones</h2>
            {solicitudes.length === 0 ? <p style={{ color: "#6B7280" }}>No hay solicitudes para mostrar.</p> : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" }}>
                {solicitudes.map(s => {
                  const estadoActual = (s.estado || 'enviada').toLowerCase();
                  return (
                  <div key={s.aplicacion_id || s.id} style={{ padding: "20px", border: "1px solid #E5E7EB", borderRadius: "20px", background: "#fff", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h4 style={{ margin: "0 0 4px 0", fontSize: "1.1rem", color: "#111827" }}>{s.nombre_postulante || s.nombre_usuario || `Postulante #${s.usuario_id}`}</h4>
                        <p style={{ margin: "0", color: "#6B7280", fontSize: "0.9rem" }}>Postuló a: <span style={{ fontWeight: "500", color: "#374151" }}>{s.titulo_oferta || `Oferta #${s.oferta_id}`}</span></p>
                      </div>
              <span style={{ fontSize: "0.75rem", padding: "6px 10px", borderRadius: "999px", background: (estadoActual === 'pendiente' || estadoActual === 'enviada') ? "#FEF3C7" : "#D1FAE5", color: (estadoActual === 'pendiente' || estadoActual === 'enviada') ? "#92400E" : "#065F46", fontWeight: "600", textTransform: "capitalize" }}>
                {s.estado || 'Enviada'}
                      </span>
                    </div>
                    <button style={{ width: "100%", padding: "10px", background: "#F9FAFB", color: "#374151", border: "1px solid #D1D5DB", borderRadius: "14px", cursor: "pointer", fontWeight: "600", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#F3F4F6'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#F9FAFB'; }}
                      onClick={() => handleVerDetalle(s)}>
                      Ver detalle completo
                    </button>
                  </div>
                )})}
              </div>
            )}
          </div>
        );
      case "crearOferta": 
        return (
          <div>
            <h2 style={{ marginBottom: "30px", fontSize: "1.8rem", color: "#111827" }}>Crear una Oferta</h2>
            <form onSubmit={handleCrearOferta} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Título de la oferta</label>
                <input type="text" value={nuevaOferta.titulo} onChange={e => setNuevaOferta({...nuevaOferta, titulo: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Área</label>
                <input type="text" value={nuevaOferta.area} onChange={e => setNuevaOferta({...nuevaOferta, area: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Salario</label>
                <input type="number" step="0.01" value={nuevaOferta.salario} onChange={e => setNuevaOferta({...nuevaOferta, salario: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Modalidad</label>
                <select value={nuevaOferta.modalidad} onChange={e => setNuevaOferta({...nuevaOferta, modalidad: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem", backgroundColor: "#fff" }} required>
                  <option value="">Seleccione...</option>
                  <option value="presencial">Presencial</option>
                  <option value="remoto">Remoto</option>
                  <option value="hibrido">Híbrido</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Tipo de Contrato</label>
                <select value={nuevaOferta.tipo_contrato} onChange={e => setNuevaOferta({...nuevaOferta, tipo_contrato: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem", backgroundColor: "#fff" }} required>
                  <option value="">Seleccione...</option>
                  <option value="tiempo_completo">Tiempo Completo</option>
                  <option value="medio_tiempo">Medio Tiempo</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Descripción</label>
                <textarea rows="5" value={nuevaOferta.descripcion} onChange={e => setNuevaOferta({...nuevaOferta, descripcion: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }} required></textarea>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Requisitos</label>
                <textarea rows="4" value={nuevaOferta.requisitos} onChange={e => setNuevaOferta({...nuevaOferta, requisitos: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }}></textarea>
              </div>
              <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <button type="submit" style={{ padding: "14px 30px", background: "#800020", color: "white", border: "none", borderRadius: "14px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}>Publicar Oferta</button>
              </div>
            </form>
          </div>
        );
      case "ofertasInactivas": 
        return (
          <div>
            <h2 style={{ marginBottom: "30px", fontSize: "1.8rem", color: "#111827" }}>Ofertas Inactivas o Vencidas</h2>
            {inactivas.length === 0 ? <p style={{ color: "#6B7280" }}>No tienes ofertas inactivas.</p> : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
                {inactivas.map(o => (
                  <div key={o.oferta_id || o.id} style={{ padding: "24px", border: "1px solid #E5E7EB", borderRadius: "20px", background: "#F9FAFB", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: 0.8 }}>
                    <div>
                      <h3 style={{ margin: "0 0 12px 0", color: "#6B7280", fontSize: "1.2rem", textDecoration: "line-through" }}>{o.titulo}</h3>
                      <p style={{ margin: "0 0 8px 0", color: "#9CA3AF", fontSize: "0.95rem" }}>
                        <strong>Área:</strong> {o.area}
                      </p>
                      <p style={{ margin: "0 0 16px 0", color: "#9CA3AF", fontSize: "0.95rem", textTransform: "capitalize" }}>
                        <strong>Modalidad:</strong> {o.modalidad}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "informacionEmpresa": 
        return (
          <div>
            <h2 style={{ marginBottom: "30px", fontSize: "1.8rem", color: "#111827" }}>Información de la Empresa</h2>
            <form onSubmit={handleActualizarEmpresa} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Nombre de la Empresa</label>
                <input type="text" value={empresaData.nombre} onChange={e => setEmpresaData({...empresaData, nombre: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }} required />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Teléfono de Contacto</label>
                <input type="text" value={empresaData.telefono} onChange={e => setEmpresaData({...empresaData, telefono: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Descripción / Acerca de la empresa</label>
                <textarea rows="5" value={empresaData.resumen_profesional} onChange={e => setEmpresaData({...empresaData, resumen_profesional: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }}></textarea>
              </div>
              <div style={{ gridColumn: "1 / -1", borderTop: "1px solid #E5E7EB", paddingTop: "25px", marginTop: "10px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Nueva Contraseña (Opcional)</label>
                <input type="password" value={empresaData.password} onChange={e => setEmpresaData({...empresaData, password: e.target.value})} placeholder="Dejar en blanco para no cambiar" style={{ width: "100%", maxWidth: "50%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #D1D5DB", outline: "none", fontSize: "1rem" }} />
              </div>
              <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <button type="submit" style={{ padding: "14px 30px", background: "#800020", color: "white", border: "none", borderRadius: "14px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}>Guardar Cambios</button>
              </div>
            </form>
          </div>
        );
      default: 
        return null;
    }
  };

  if (!user || String(user.rol).toLowerCase().trim() !== "empresa") return null;

  return (
    <div style={{ 
      display: "flex", 
      backgroundColor: "#F9FAFB", 
      minHeight: "calc(100vh - 75px)", 
      marginLeft: "calc(50% - 50vw)", 
      marginRight: "calc(50% - 50vw)",
      marginTop: "-2rem",
      marginBottom: "-2rem",
      width: "100vw"
    }}>
      
      <aside style={{ width: "280px", backgroundColor: "#fff", borderRight: "1px solid #E5E7EB", padding: "30px 0", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ padding: "0 24px", marginBottom: "30px" }}>
          <h3 style={{ color: "#800020", margin: 0, fontSize: "1.25rem", fontWeight: "700" }}>Panel de Empresa</h3>
        </div>
        
        <ul style={{ listStyle: "none", padding: "0 16px 0 0", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { id: "ofertasActivas", label: "Ofertas Activas" },
            { id: "solicitudes", label: "Solicitudes de postulaciones" },
            { id: "crearOferta", label: "Crear una oferta" },
            { id: "ofertasInactivas", label: "Ofertas inactivas o vencidas" },
            { id: "informacionEmpresa", label: "Información de la empresa" },
          ].map(tab => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: "100%", textAlign: "left", padding: "14px 20px", border: "none",
                  backgroundColor: activeTab === tab.id ? "#fff0f2" : "transparent",
                  color: activeTab === tab.id ? "#800020" : "#4B5563",
                  fontWeight: activeTab === tab.id ? "600" : "500",
                  cursor: "pointer", transition: "all 0.2s ease",
                  borderRadius: "0 24px 24px 0",
                  borderLeft: activeTab === tab.id ? "4px solid #800020" : "4px solid transparent",
                  fontSize: "0.95rem"
                }}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main style={{ flex: 1, padding: "40px" }}>
        <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "28px", border: "1px solid #E5E7EB", minHeight: "100%", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
          {renderContent()}
        </div>
      </main>

      {selectedSolicitud && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "20px", width: "90%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
            <h2 style={{ marginTop: 0, color: "#111827", fontSize: "1.5rem" }}>Detalle de Postulación</h2>
            <p style={{ margin: "10px 0", color: "#4B5563" }}><strong>Oferta:</strong> {selectedSolicitud.titulo_oferta || `Oferta #${selectedSolicitud.oferta_id}`}</p>
            <hr style={{ border: "0", borderTop: "1px solid #E5E7EB", margin: "20px 0" }}/>
            
            <h3 style={{ color: "#374151", marginBottom: "15px" }}>Información del Postulante</h3>
            {loadingDetalle ? (
              <p style={{ color: "#6B7280" }}>Cargando información...</p>
            ) : postulanteDetalle ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#4B5563" }}>
                <p style={{ margin: 0 }}><strong>Nombre:</strong> {postulanteDetalle.nombre} {postulanteDetalle.apellido}</p>
                <p style={{ margin: 0 }}><strong>Email:</strong> {postulanteDetalle.email}</p>
                <p style={{ margin: 0 }}><strong>Teléfono:</strong> {postulanteDetalle.telefono || "No especificado"}</p>
                <div style={{ margin: 0 }}>
                  <strong>Resumen Profesional:</strong>
                  <p style={{ margin: "5px 0 0 0", padding: "10px", background: "#F9FAFB", borderRadius: "8px", border: "1px solid #E5E7EB" }}>
                    {postulanteDetalle.resumen_profesional || "El usuario no ha proporcionado un resumen."}
                  </p>
                </div>
                {postulanteDetalle.url_cv && (
                  <p style={{ margin: 0 }}><strong>CV:</strong> <a href={postulanteDetalle.url_cv} target="_blank" rel="noreferrer" style={{ color: "#800020", fontWeight: "600", textDecoration: "none" }}>Abrir Currículum</a></p>
                )}
              </div>
            ) : (
              <p style={{ color: "#EF4444" }}>No se pudo cargar la información del usuario.</p>
            )}
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "30px" }}>
              <button onClick={() => setSelectedSolicitud(null)} style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid #D1D5DB", background: "#fff", color: "#374151", cursor: "pointer", fontWeight: "500" }}>Cerrar</button>
              <button onClick={handleAceptarSolicitud} style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: "#065F46", color: "#fff", cursor: "pointer", fontWeight: "bold" }}>Aceptar Postulante</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardEmpresa;