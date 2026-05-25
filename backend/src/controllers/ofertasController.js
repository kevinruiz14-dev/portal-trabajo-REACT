const Oferta = require("../models/ofertaModel");

exports.crearOferta = async (req, res) => {
  try {
    const nuevaOferta = await Oferta.crear(req.body);
    res.status(201).json({ mensaje: "Oferta creada", data: nuevaOferta });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear la oferta", detalle: error.message });
  }
};

exports.editarOferta = async (req, res) => {
  try {
    const { id } = req.params;
    const ofertaActualizada = await Oferta.editar(id, req.body);
    if (!ofertaActualizada)
      return res.status(404).json({ error: "Oferta no encontrada" });
    res.json({ mensaje: "Oferta actualizada", data: ofertaActualizada });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al editar la oferta", detalle: error.message });
  }
};

exports.eliminarOferta = async (req, res) => {
  try {
    const { id } = req.params;
    const ofertaEliminada = await Oferta.eliminar(id);
    if (!ofertaEliminada)
      return res.status(404).json({ error: "Oferta no encontrada" });
    res.json({ mensaje: "Oferta eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar la oferta", detalle: error.message });
  }
};

exports.listarOfertas = async (req, res) => {
  try {
    const ofertas = await Oferta.listar();
    res.json({ data: ofertas });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las ofertas", detalle: error.message });
  }
};
