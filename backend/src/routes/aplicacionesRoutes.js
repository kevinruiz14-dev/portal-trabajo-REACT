import express from "express";

import {
  postAplicacion,
  getAllAplicaciones,
  getByUser,
  getByOferta,
  updateEstado,
  deleteAplicacion
} from "../controllers/aplicacionesController.js";

const router = express.Router();

router.post("/", postAplicacion);
router.get("/", getAllAplicaciones);
router.get("/usuario/:usuario_id", getByUser);
router.get("/oferta/:oferta_id", getByOferta);
router.put("/:id", updateEstado);
router.delete("/:id", deleteAplicacion);

export default router;