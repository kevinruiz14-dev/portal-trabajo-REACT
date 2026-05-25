const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresasController');

router.post('/', empresasController.crearEmpresa);
router.put('/:id', empresasController.editarEmpresa);
router.patch('/:id/inactivar', empresasController.inactivarEmpresa);

module.exports = router;