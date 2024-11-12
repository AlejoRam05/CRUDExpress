const express = require('express');
const router = express.Router();
const UserController = require('../controllers/uController');
// Obtener todos los usuarios
router.get('/', UserController.getUsers);

// Crear usuario
router.post('/users', UserController.createUser);

// Votar por usuario
router.post('/users/:id/vote', UserController.voteUser);

// Obtener usuario por ID
router.get('/users/:id', UserController.getUserById);

// Actualizar usuario
router.put('/users/:id', UserController.updateUser);

// Eliminar usuario
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
