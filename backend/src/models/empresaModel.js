const pool = require("../config/db");

const Empresa = {
  crear: async (data) => {
    const { usuario_id, nombre_empresa, sitio_web, descripcion, ubicacion } =
      data;
    const result = await pool.query(
      "INSERT INTO empresas (usuario_id, nombre_empresa, sitio_web, descripcion, ubicacion) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [usuario_id, nombre_empresa, sitio_web, descripcion, ubicacion],
    );
    return result.rows[0];
  },
  editar: async (empresa_id, data) => {
    const { nombre_empresa, sitio_web, descripcion, ubicacion } = data;
    const result = await pool.query(
      "UPDATE empresas SET nombre_empresa = $1, sitio_web = $2, descripcion = $3, ubicacion = $4 WHERE empresa_id = $5 RETURNING *",
      [nombre_empresa, sitio_web, descripcion, ubicacion, empresa_id],
    );
    return result.rows[0];
  },
  inactivar: async (empresa_id) => {
    const result = await pool.query(
      "UPDATE empresas SET activa = false WHERE empresa_id = $1 RETURNING *",
      [empresa_id],
    );
    return result.rows[0];
  },
};

module.exports = Empresa;
