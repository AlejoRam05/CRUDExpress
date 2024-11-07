const { User } = require('../models/models');

// Función para obtener todos los usuarios con sus pizarras
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ votos: -1 }); // Ordenar usuarios por votos en orden descendente
        res.render('index', { users });
    } catch (err) {
        console.log('Error al obtener usuarios', err);
        res.status(500).send('Error en el servidor');
    }
};

// Función para crear un nuevo usuario con pizarras
const createUser = (req, res) => {
    const { nombre, email, pizarras } = req.body; // Se espera que 'pizarras' venga como un arreglo en el cuerpo de la solicitud

    const user = new User({
        nombre,
        email,
        pizarras, // Guardar las pizarras como subdocumentos dentro del usuario
    });

    user.save()
        .then(() => res.redirect('/')) // Redirigir al índice después de crear el usuario
        .catch(err => res.status(400).send('Error al crear el usuario'));
};

// Función para actualizar un usuario con pizarras
const updateUser = (req, res) => {
    const userId = req.params.id;
    const { nombre, email, pizarras } = req.body; // Recibir nuevos valores para el usuario y las pizarras

    User.findByIdAndUpdate(userId, { nombre, email, pizarras }, { new: true })
        .then(() => res.redirect('/')) // Redirigir al índice después de actualizar el usuario
        .catch(err => res.status(400).send('Error al actualizar el usuario'));
};

// Función para eliminar un usuario (y sus pizarras asociadas)
const deleteUser = (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(() => res.redirect('/')) // Redirigir al índice después de eliminar el usuario
        .catch(err => res.status(400).send('Error al eliminar el usuario'));
};

// Función para agregar una nueva pizarra a un usuario
const addPizarraToUser = async (req, res) => {
    const userId = req.params.id;
    const { clase } = req.body; // Recibir los datos de la pizarra (en este caso 'clase')

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Agregar una nueva pizarra al arreglo de pizarras del usuario
        user.pizarras.push({ clase });
        await user.save();

        res.redirect(`/users/${userId}/pizarras`);
    } catch (err) {
        console.log('Error al agregar pizarra', err);
        res.status(500).send('Error al agregar la pizarra');
    }
};

// Función para obtener las pizarras de un usuario específico
const getUserPizarras = async (req, res) => {
    const userId = req.params.id; // Obtener el id del usuario

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('Usuario no encontrado');

        res.render('userDetail', { user }); // Pasar el usuario con sus pizarras a la vista
    } catch (err) {
        console.log('Error al obtener pizarras', err);
        res.status(500).send('Error al obtener las pizarras');
    }
};
const voteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndUpdate(userId, { $inc: { votos: 1 } }, { new: true });
        if (!user) return res.status(404).send('Usuario no encontrado');
        
        res.json({ success: true, votos: user.votos }); // Enviar los votos actualizados al cliente
    } catch (err) {
        console.log('Error al votar por el usuario', err);
        res.status(500).send('Error al votar por el usuario');
    }
};

module.exports = { 
    getAllUsers, 
    createUser, 
    updateUser, 
    deleteUser, 
    addPizarraToUser, 
    getUserPizarras,
    voteUser 
};