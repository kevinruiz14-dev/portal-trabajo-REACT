const express = require('express');
const router = express.Router();
const ofertasController = require('../controllers/ofertasController');

router.post('/', ofertasController.crearOferta);
router.get('/', ofertasController.listarOfertas);
router.put('/:id', ofertasController.editarOferta);
router.delete('/:id', ofertasController.eliminarOferta);

module.exports = router;