import pool from "../config/db.js";

const Usuario = {

  crear: async (data) => {
    const { nombre, apellido, telefono, email, password, rol } = data;

    const result = await pool.query(
      `
      INSERT INTO usuarios
      (nombre, apellido, telefono, email, password_hash, rol)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [nombre, apellido, telefono, email, password, rol]
    );

    return result.rows[0];
  },

  obtenerTodos: async () => {
    const result = await pool.query(`
      SELECT id, nombre, apellido, telefono, email, rol
      FROM usuarios
    `);

    return result.rows;
  },

  obtenerPorId: async (id) => {
    const result = await pool.query(`
      SELECT id, nombre, apellido, telefono, email, rol
      FROM usuarios
      WHERE id = $1
    `, [id]);

    return result.rows[0];
  },

  eliminar: async (id) => {
    const result = await pool.query(`
      DELETE FROM usuarios
      WHERE id = $1
      RETURNING *
    `, [id]);

    return result.rows[0];
  }
};

export default Usuario;