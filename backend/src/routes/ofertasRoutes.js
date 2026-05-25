import express from 'express';
const router = express.Router();
import * as ofertasController from '../controllers/ofertasController.js';

router.post('/', ofertasController.crearOferta);
router.get('/', ofertasController.listarOfertas);
router.put('/:id', ofertasController.editarOferta);
router.delete('/:id', ofertasController.eliminarOferta);

export default router;