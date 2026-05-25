import pool from "../config/db.js";

const Usuario = {

  crear: async (data) => {

    const {
      nombre,
      apellido,
      telefono,
      email,
      password,
      rol
    } = data;

    const result = await pool.query(
      `
      INSERT INTO usuarios
      (
        nombre,
        apellido,
        telefono,
        email,
        password_hash,
        rol
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        nombre,
        apellido,
        telefono,
        email,
        password,
        rol
      ]
    );

    return result.rows[0];
  }

};

export default Usuario;