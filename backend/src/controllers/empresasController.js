const Empresa = require('../models/empresaModel');

exports.crearEmpresa = async (req, res) => {
    try {
        const nuevaEmpresa = await Empresa.crear(req.body);
        res.status(201).json({ mensaje: 'Empresa creada con éxito', data: nuevaEmpresa });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la empresa', detalle: error.message });
    }
};

exports.editarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const empresaActualizada = await Empresa.editar(id, req.body);
        if (!empresaActualizada) return res.status(404).json({ error: 'Empresa no encontrada' });
        res.json({ mensaje: 'Empresa actualizada', data: empresaActualizada });
    } catch (error) {
        res.status(500).json({ error: 'Error al editar la empresa', detalle: error.message });
    }
};

exports.inactivarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const empresaInactiva = await Empresa.inactivar(id);
        if (!empresaInactiva) return res.status(404).json({ error: 'Empresa no encontrada' });
        res.json({ mensaje: 'Empresa inactivada correctamente', data: empresaInactiva });
    } catch (error) {
        res.status(500).json({ error: 'Error al inactivar la empresa', detalle: error.message });
    }
};