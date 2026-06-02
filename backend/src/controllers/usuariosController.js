import Usuario from "../models/usuariosModel.js";
import bcrypt from "bcrypt";

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

    const nombreFinal = nombre || req.body.nombre_empresa || req.body.nombreEmpresa || "Empresa";

    // ENCRIPTAR PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.crear({
      nombre: nombreFinal,
      apellido,
      telefono,
      email,
      password_hash: hashedPassword, // IMPORTANTE
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

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Separamos la contraseña hasheada del resto de los datos del usuario por seguridad
    const { password_hash, ...usuarioSinPassword } = user;

    return res.status(200).json({
      message: "Login exitoso",
      user: usuarioSinPassword,
    });

  } catch (error) {
    next(error);
  }
};

/*ACTUALIZAR USUARIO */
export const updateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id } = req.params;

    const {
      nombre,
      apellido,
      telefono,
      email,
      password,
      rol,
      resumen_profesional,
      url_cv
    } = req.body;

    const actualizado = await Usuario.actualizar(id, {
      nombre,
      apellido,
      telefono,
      email,
      password,
      rol,
      resumen_profesional,
      url_cv
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