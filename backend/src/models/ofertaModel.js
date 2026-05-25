import pool from "../config/db.js";

const Oferta = {
  crear: async (data) => {
    const { empresa_id, titulo, descripcion, requisitos, salario } = data;
    const result = await pool.query(
      "INSERT INTO ofertas (empresa_id, titulo, descripcion, requisitos, salario) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [empresa_id, titulo, descripcion, requisitos, salario],
    );
    return result.rows[0];
  },
  editar: async (oferta_id, data) => {
    const { titulo, descripcion, requisitos, salario, activa } = data;
    const result = await pool.query(
      "UPDATE ofertas SET titulo = $1, descripcion = $2, requisitos = $3, salario = $4, activa = $5 WHERE oferta_id = $6 RETURNING *",
      [titulo, descripcion, requisitos, salario, activa, oferta_id],
    );
    return result.rows[0];
  },
  eliminar: async (oferta_id) => {
    const result = await pool.query(
      "DELETE FROM ofertas WHERE oferta_id = $1 RETURNING *",
      [oferta_id],
    );
    return result.rows[0];
  },
  listar: async () => {
    const result = await pool.query(`
            SELECT o.*, e.nombre_empresa 
            FROM ofertas o 
            JOIN empresas e ON o.empresa_id = e.empresa_id 
            WHERE o.activa = true 
            ORDER BY o.creada_en DESC
        `);
    return result.rows;
  },
};

export default Oferta;
