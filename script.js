const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./models/models'); // Asegúrate de importar el modelo de usuario
const userRoutes = require('./routes/uRoutes'); // Rutas de usuarios
const app = express();

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs'); 

// Middleware para procesar datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal (index) para mostrar todos los usuarios
app.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Obtener todos los usuarios con sus pizarras
        res.render('index', { users }); // Pasar los usuarios a la vista
    } catch (err) {
        console.log('Error al obtener usuarios', err);
        res.status(500).send('Error en el servidor');
    }
});

// Conexión con MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/crudexpress', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Conectado a la base de datos'))
.catch((err) => console.log('Error de conexión', err));

// Rutas para usuarios y pizarras
app.use('/users', userRoutes);

// Iniciar servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
