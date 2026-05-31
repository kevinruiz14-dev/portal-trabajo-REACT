import pool from "../config/db.js";

const Aplicacion = {

  crear: async (data) => {
    const { oferta_id, usuario_id } = data;

    const result = await pool.query(
      `
      INSERT INTO aplicaciones (oferta_id, usuario_id)
      VALUES ($1, $2)
      RETURNING *
      `,
      [oferta_id, usuario_id]
    );

    return result.rows[0];
  },

  obtenerTodas: async () => {
    const result = await pool.query(`
      SELECT * FROM aplicaciones
    `);

    return result.rows;
  },

  obtenerPorUsuario: async (usuario_id) => {
    const result = await pool.query(`
      SELECT * FROM aplicaciones
      WHERE usuario_id = $1
    `, [usuario_id]);

    return result.rows;
  },

  obtenerPorOferta: async (oferta_id) => {
    const result = await pool.query(`
      SELECT * FROM aplicaciones
      WHERE oferta_id = $1
    `, [oferta_id]);

    return result.rows;
  },

  actualizarEstado: async (id, estado) => {
    const result = await pool.query(`
      UPDATE aplicaciones
      SET estado = $1
      WHERE aplicacion_id = $2
      RETURNING *
    `, [estado, id]);

    return result.rows[0];
  },

  eliminar: async (id) => {
    const result = await pool.query(`
      DELETE FROM aplicaciones
      WHERE aplicacion_id = $1
      RETURNING *
    `, [id]);

    return result.rows[0];
  }

};

export default Aplicacion;