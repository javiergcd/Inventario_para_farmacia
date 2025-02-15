require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba para ver si PostgreSQL funciona
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Conexión a la base de datos exitosa', time: result.rows[0].now });
    } catch (error) {
        console.error('Error al conectar a PostgreSQL', error);
        res.status(500).json({ message: 'Error en la base de datos' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
