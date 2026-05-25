import express from 'express';
const router = express.Router();
import * as empresasController from '../controllers/empresasController.js';

router.post('/', empresasController.crearEmpresa);
router.put('/:id', empresasController.editarEmpresa);
router.patch('/:id/inactivar', empresasController.inactivarEmpresa);

export default router;