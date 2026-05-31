import Aplicacion from "../models/aplicacionesModel.js";

/* CREAR APLICACIÓN */
export const postAplicacion = async (req, res, next) => {
  try {
    const { oferta_id, usuario_id } = req.body;

    const nueva = await Aplicacion.crear({ oferta_id, usuario_id });

    return res.status(201).json(nueva);

  } catch (error) {
    next(error);
  }
};

/* TODAS */
export const getAllAplicaciones = async (req, res, next) => {
  try {
    const data = await Aplicacion.obtenerTodas();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/* POR USUARIO */
export const getByUser = async (req, res, next) => {
  try {
    const { usuario_id } = req.params;
    const data = await Aplicacion.obtenerPorUsuario(usuario_id);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/* POR OFERTA */
export const getByOferta = async (req, res, next) => {
  try {
    const { oferta_id } = req.params;
    const data = await Aplicacion.obtenerPorOferta(oferta_id);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/* CAMBIAR ESTADO */
export const updateEstado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const actualizado = await Aplicacion.actualizarEstado(id, estado);

    return res.status(200).json(actualizado);

  } catch (error) {
    next(error);
  }
};

/* ELIMINAR */
export const deleteAplicacion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const eliminado = await Aplicacion.eliminar(id);

    return res.status(200).json(eliminado);

  } catch (error) {
    next(error);
  }
};