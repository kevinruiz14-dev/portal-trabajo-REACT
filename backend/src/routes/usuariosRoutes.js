import express from 'express';
import * as usuariosController from '../controllers/usuariosController.js';

const router = express.Router();

/* RUTA CREAR USUARIO */
router.post('/', usuariosController.postCreateUser);

export default router;