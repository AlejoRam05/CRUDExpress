const express = require('express');
const router = express.Router();
const { 
    getAllUsers, 
    createUser, 
    updateUser, 
    deleteUser, 
    addPizarraToUser, 
    getUserPizarras,
    voteUser 
} = require('../controllers/uController');

// Ruta para obtener el formulario de creación de un usuario
router.get('/create', (req, res) => {
    res.render('create'); // Renderizar la vista 'create.ejs' para crear un nuevo usuario
});

// Rutas de usuarios y pizarras
router.get('/', getAllUsers); // Obtener todos los usuarios
router.post('/', createUser); // Crear un nuevo usuario
router.put('/:id', updateUser); // Actualizar un usuario específico
router.delete('/:id', deleteUser); // Eliminar un usuario específico
router.post('/:id/vote', voteUser)
router.post('/:id/pizarras', addPizarraToUser); // Agregar una pizarra a un usuario específico
router.get('/pizarras/:id', getUserPizarras); // Obtener todas las pizarras de un usuario específico
router.delete('/users/:id', deleteUser);
router.post('/users/update', updateUser);

module.exports = router;
