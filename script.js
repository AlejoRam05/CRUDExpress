const express = require("express");
const app = express();
const PORT = 5000;
const usersRoutes = require("./src/routes/userRoutes");
const path = require('path');


app.use(express.json());
app.use("/api", usersRoutes);

// Ruta para servir index.html en /api/usuarios
app.get('/api/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); 
});

// Ruta raíz opcional
app.get('/', (req, res) => {
    res.send('Hello World desde Express!');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
