import Usuario from "../models/usuariosModel.js";
/* CREAR USUARIO */
export const postCreateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    
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

    return res.status(201).json(nuevoUsuario);

  } catch (err) {
    next(err);
  }
};

/*OBTENER USUARIOS */
 export const getAllUsers = async (req, res, next) => {
  try {
    const usuarios = await Usuario.obtenerTodos();
    return res.status(200).json(usuarios);

  } catch (error) {
    next(error);
  }
};

/* OBTENER USUARIO POR ID */
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.obtenerPorId(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    return res.status(200).json(usuario);

  } catch (error) {
    next(error);
  }
};

/* ELIMINAR USUARIO */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const eliminado = await Usuario.eliminar(id);

    if (!eliminado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    return res.status(200).json({ mensaje: "Usuario eliminado", eliminado });

  } catch (error) {
    next(error);  }
};

/* LOGIN DE USUARIOS */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Usuario.buscarPorEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.password_hash !== password) {
  return res.status(401).json({ message: "Contraseña incorrecta" });
}

    return res.status(200).json({
      message: "Login exitoso",
      user
    });

  } catch (error) {
    next(error);
  }
};

/*ACTUALIZAR USUARIO */
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      nombre,
      apellido,
      telefono,
      email,
      password,
      rol
    } = req.body;

    const actualizado = await Usuario.actualizar(id, {
      nombre,
      apellido,
      telefono,
      email,
      password,
      rol
    });

    if (!actualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    return res.status(200).json({
      mensaje: "Usuario actualizado",
      usuario: actualizado
    });

  } catch (error) {
    next(error);
  }
};