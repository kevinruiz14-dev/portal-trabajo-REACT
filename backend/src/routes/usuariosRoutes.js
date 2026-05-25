import express from 'express';
import * as usuariosController from '../controllers/usuariosController.js';

const router = express.Router();

/* RUTA CREAR USUARIO */
router.post('/', usuariosController.postCreateUser);

/* RUTA OBTENER USUARIOS */
router.get('/', usuariosController.getAllUsers);
/* RUTA OBTENER USUARIO POR ID */
router.get('/:id', usuariosController.getUserById);

export default router;

