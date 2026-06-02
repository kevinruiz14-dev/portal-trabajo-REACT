import Oferta from '../models/ofertaModel.js';
import pool from '../config/db.js';

export const crearOferta = async (req, res) => {
  try {
    let { empresa_id, usuario_id } = req.body;

    if (usuario_id) {
      let empRes = await pool.query(`SELECT empresa_id FROM empresas WHERE usuario_id = $1 LIMIT 1`, [usuario_id]);
      if (empRes.rowCount > 0) {
        empresa_id = empRes.rows[0].empresa_id;
      } else {
        const userRes = await pool.query(`SELECT nombre FROM usuarios WHERE usuario_id = $1`, [usuario_id]);
        if (userRes.rowCount > 0) {
          const newEmp = await pool.query(
            `INSERT INTO empresas (usuario_id, nombre_empresa) VALUES ($1, $2) RETURNING empresa_id`, 
            [usuario_id, userRes.rows[0].nombre || 'Empresa']
          );
          empresa_id = newEmp.rows[0].empresa_id;
        }
      }
    }

    if (!empresa_id) {
      return res.status(400).json({ error: "No se pudo vincular la cuenta con un perfil de empresa válido." });
    }

    req.body.empresa_id = empresa_id;

    const nuevaOferta = await Oferta.crear(req.body);
    res.status(201).json({ mensaje: "Oferta creada", data: nuevaOferta });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la oferta", detalle: error.message });
  }
};

export const editarOferta = async (req, res) => {
  try {
    const { id } = req.params;
    const ofertaActualizada = await Oferta.editar(id, req.body);
    if (!ofertaActualizada) return res.status(404).json({ error: "Oferta no encontrada" });
    res.json({ mensaje: "Oferta actualizada", data: ofertaActualizada });
  } catch (error) {
    res.status(500).json({ error: "Error al editar la oferta", detalle: error.message });
  }
};

export const eliminarOferta = async (req, res) => {
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

export const listarOfertas = async (req, res) => {
  try {
    const ofertas = await Oferta.listar();
    res.json({ data: ofertas });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las ofertas", detalle: error.message });
  }
};
