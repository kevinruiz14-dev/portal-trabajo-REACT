import pool from "../config/db.js";

const Oferta = {
  crear: async (data) => {
    const { empresa_id, titulo, descripcion, requisitos, salario, modalidad, tipo_contrato, area, activa } = data;
    const result = await pool.query(
      `INSERT INTO ofertas (empresa_id, titulo, descripcion, requisitos, salario, modalidad, tipo_contrato, area, activa) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [empresa_id, titulo, descripcion, requisitos, salario || null, modalidad, tipo_contrato, area, activa !== false]
    );
    return result.rows[0];
  },
  editar: async (oferta_id, data) => {
    const { titulo, descripcion, requisitos, salario, activa, modalidad, tipo_contrato, area } = data;
    const result = await pool.query(
      `UPDATE ofertas SET titulo = $1, descripcion = $2, requisitos = $3, salario = $4, activa = $5, modalidad = $6, tipo_contrato = $7, area = $8 WHERE oferta_id = $9 RETURNING *`,
      [titulo, descripcion, requisitos, salario || null, activa !== false, modalidad, tipo_contrato, area, oferta_id]
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
            SELECT o.*, e.nombre_empresa, e.ubicacion
            FROM ofertas o 
            JOIN empresas e ON o.empresa_id = e.empresa_id 
            WHERE o.activa = true 
            ORDER BY o.creada_en DESC
        `);
    return result.rows;
  },
};

export default Oferta;
