import express from 'express';
import * as usersController from '../controllers/usuariosController.js';

const router = express.Router();
/*RUTA CREAR USUARIO*/
router.post('/', usuariosController.postCreateUser);

export default router;

