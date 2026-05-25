<<<<<<< Updated upstream
import dotenv from 'dotenv';
import express from 'express';


// Usar rutas
import empresasRoutes from './src/routes/empresasRoutes.js';
import ofertasRoutes from './src/routes/ofertasRoutes.js';
import usuariosRoutes from './src/routes/usuariosRoutes.js';

dotenv.config(); 
=======
import dotenv from "dotenv";
dotenv.config();

import express from "express";

import empresasRoutes from "./src/routes/empresasRoutes.js";
import ofertasRoutes from "./src/routes/ofertasRoutes.js";
import usuariosRoutes from "./src/routes/usuariosRoutes.js";

>>>>>>> Stashed changes
const app = express();

app.use(express.json());

<<<<<<< Updated upstream
app.use('/api/empresas', empresasRoutes);
app.use('/api/ofertas', ofertasRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor.' });
});

// Usar el puerto del .env o el 3000 por defecto
=======
app.use("/api/empresas", empresasRoutes);
app.use("/api/ofertas", ofertasRoutes);
app.use("/api/usuarios", usuariosRoutes);

>>>>>>> Stashed changes
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});