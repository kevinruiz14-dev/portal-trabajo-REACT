import Usuario from "../models/usuariosModel.js";

/* CREAR USUARIO */
export const postCreateUser = async (req, res, next) => {

  try {

    const {
      nombre,
      apellido,
      telefono,
      email,
      password,
      rol
    } = req.body;

    const nuevoUsuario = await Usuario.crear({
      nombre,
      apellido,
      telefono,
      email,
      password,
      rol
    });

    res.status(201).json(nuevoUsuario);

  } catch (err) {

    next(err);

  }

};