require('dotenv').config(); 
const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Importar rutas
const empresasRoutes = require('./src/routes/empresasRoutes');
const ofertasRoutes = require('./src/routes/ofertasRoutes');

// Usar rutas
app.use('/api/empresas', empresasRoutes);
app.use('/api/ofertas', ofertasRoutes);

// Usar el puerto del .env o el 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});