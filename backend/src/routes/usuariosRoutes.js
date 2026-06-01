import express from 'express';
import * as usuariosController from '../controllers/usuariosController.js';
import {
  postCreateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  loginUser,
  updateUser
} from "../controllers/usuariosController.js";

const router = express.Router();

/* RUTA CREAR USUARIO */
router.post('/', usuariosController.postCreateUser);

/* RUTA OBTENER USUARIOS */
router.get('/', usuariosController.getAllUsers);
/* RUTA OBTENER USUARIO POR ID */
router.get('/:id', usuariosController.getUserById);

/*ELIMINAR USUARIO POR ID */
router.delete('/:id', usuariosController.deleteUser);

/*RUTA LOGIN USUARIO */
router.post('/login', usuariosController.loginUser);

/*RUTA ACTUALIZAR USUARIO */
router.put("/:id", usuariosController.updateUser);

export default router;

