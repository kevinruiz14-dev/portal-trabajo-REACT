import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config(); 

// Usar rutas
import empresasRoutes from './src/routes/empresasRoutes.js';
import ofertasRoutes from './src/routes/ofertasRoutes.js';
import usuariosRoutes from './src/routes/usuariosRoutes.js';
import aplicacionesRoutes from './src/routes/aplicacionesRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/empresas', empresasRoutes);
app.use('/api/ofertas', ofertasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/aplicaciones', aplicacionesRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor.' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});