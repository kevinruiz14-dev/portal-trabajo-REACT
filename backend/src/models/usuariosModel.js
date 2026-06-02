import pool from "../config/db.js";

const Usuario = {

  crear: async (data) => {
    const { nombre, apellido, telefono, email, password_hash, rol } = data;

    const result = await pool.query(
      `
      INSERT INTO usuarios
      (nombre, apellido, telefono, email, password_hash, rol)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [nombre, apellido, telefono, email, password_hash, rol]
    );

    return result.rows[0];
  },

  obtenerTodos: async () => {
    const result = await pool.query(`
      SELECT usuario_id, nombre, apellido, telefono, email, rol
      FROM usuarios
    `);

    return result.rows;
  },

  obtenerPorId: async (id) => {
    const result = await pool.query(`
      SELECT usuario_id, nombre, apellido, telefono, email, rol
      FROM usuarios
      WHERE usuario_id = $1
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
      SELECT *
      FROM usuarios
      WHERE email = $1
    `, [email]);

    return result.rows[0];
  },

  /*ACTUALIZAR USUARIO */
  actualizar: async (id, data) => {
    
    const { nombre, apellido, telefono, email, password, rol } = data;

    const result = await pool.query(
      `
      UPDATE usuarios
      SET
        nombre = $1,
        apellido = $2,
        telefono = $3,
        email = $4,
        password_hash = $5,
        rol = $6
      WHERE usuario_id = $7
      RETURNING *
      `,
      [nombre, apellido, telefono, email, password, rol, id]
    );

    return result.rows[0];
  }

};

export default Usuario;