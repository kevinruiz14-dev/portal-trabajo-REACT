import pool from "../config/db.js";

const Usuario = {

  crear: async (data) => {
    const { nombre, apellido, telefono, email, password_hash, rol, sitio_web, descripcion, ubicacion } = data;

    const result = await pool.query(
      `
      INSERT INTO usuarios
      (nombre, apellido, telefono, email, password_hash, rol)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [nombre, apellido, telefono, email, password_hash, rol]
    );

    const nuevoUsuario = result.rows[0];

    if (String(rol).toLowerCase().trim() === 'empresa') {
      try {
        await pool.query(
          `INSERT INTO empresas (usuario_id, nombre_empresa, sitio_web, descripcion, ubicacion) VALUES ($1, $2, $3, $4, $5)`,
          [nuevoUsuario.usuario_id, nombre || 'Empresa', sitio_web || null, descripcion || null, ubicacion || null]
        );
      } catch (error) {
        await pool.query(
          `UPDATE empresas SET usuario_id = $1, sitio_web = $3, descripcion = $4, ubicacion = $5 WHERE nombre_empresa = $2`,
          [nuevoUsuario.usuario_id, nombre || 'Empresa', sitio_web || null, descripcion || null, ubicacion || null]
        ).catch(err => console.error("Error al vincular empresa:", err));
      }
    }

    return nuevoUsuario;
  },

  obtenerTodos: async () => {
    const result = await pool.query(`
      SELECT u.usuario_id, u.nombre, u.apellido, u.telefono, u.email, u.rol, u.resumen_profesional, u.url_cv, e.empresa_id
      FROM usuarios u
      LEFT JOIN empresas e ON (u.usuario_id = e.usuario_id OR u.nombre = e.nombre_empresa)
    `);

    return result.rows;
  },

  obtenerPorId: async (id) => {
    const result = await pool.query(`
      SELECT u.usuario_id, u.nombre, u.apellido, u.telefono, u.email, u.rol, u.resumen_profesional, u.url_cv, e.empresa_id
      FROM usuarios u
      LEFT JOIN empresas e ON (u.usuario_id = e.usuario_id OR u.nombre = e.nombre_empresa)
      WHERE u.usuario_id = $1
    `, [id]);

    return result.rows[0];
  },

  eliminar: async (id) => {
    const result = await pool.query(`
      DELETE FROM usuarios
      WHERE usuario_id = $1
      RETURNING *
    `, [id]);

    return result.rows[0];
  },

  buscarPorEmail: async (email) => {
    const result = await pool.query(`
      SELECT u.*, e.empresa_id
      FROM usuarios u
      LEFT JOIN empresas e ON (u.usuario_id = e.usuario_id OR u.nombre = e.nombre_empresa)
      WHERE u.email = $1
    `, [email]);

    return result.rows[0];
  },

  /*ACTUALIZAR USUARIO */
  actualizar: async (id, data) => {
    
    const { nombre, apellido, telefono, email, password, rol, resumen_profesional, url_cv } = data;

    const result = await pool.query(
      `
      UPDATE usuarios
      SET
        nombre = $1,
        apellido = $2,
        telefono = $3,
        email = $4,
        password_hash = COALESCE($5, password_hash),
        rol = $6,
        resumen_profesional = $7,
        url_cv = $8
      WHERE usuario_id = $9
      RETURNING *
      `,
      [nombre, apellido, telefono, email, password, rol, resumen_profesional, url_cv, id]
    );

    return result.rows[0];
  }

};

export default Usuario;