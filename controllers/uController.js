const { User } = require('../models/models');



class UserController {
    // Obtener todos los usuarios
    static async getUsers(req, res) {
        try {
            const users = await User.find().sort({ votos: -1 });
            res.render('index', { users });
        } catch (error) {
            res.status(500).json({ 
                error: 'Error al obtener usuarios', 
                details: error.message 
            });
        }
    }

    static async createUser(req, res) {
        try {
            const { nombre, email } = req.body;
            
            // Validaciones adicionales
            if (!nombre || !email) {
                return res.status(400).render('error', { 
                    message: 'Nombre y email son requeridos' 
                });
            }
    
            // Verificar si el email ya existe
            const emailExistente = await User.findOne({ email });
            if (emailExistente) {
                return res.status(400).render('error', { 
                    message: 'El email ya está registrado' 
                });
            }
    
            const nuevoUsuario = new User({ nombre, email });
            await nuevoUsuario.save();
            res.redirect('/');
        } catch (error) {
            // Manejar errores de validación de Mongoose
            if (error.name === 'ValidationError') {
                const errores = Object.values(error.errors).map(err => err.message);
                return res.status(400).render('error', { 
                    message: errores.join(', ') 
                });
            }
            
            res.status(500).render('error', { 
                message: 'Error al crear usuario',
                details: error.message 
            });
        }
    }

    // Votar por usuario
    static async voteUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findByIdAndUpdate(
                userId, 
                { $inc: { votos: 1 } }, 
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.json({ 
                success: true, 
                votos: user.votos 
            });
        } catch (error) {
            res.status(500).json({ 
                error: 'Error al votar', 
                details: error.message 
            });
        }
    }

    static async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            res.json({
                success: true,
                user: {
                    id: user._id,
                    nombre: user.nombre,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({ 
                error: 'Error al obtener usuario', 
                details: error.message 
            });
        }
    }
    

    // Actualizar usuario
    static async updateUser(req, res) {
    try {
        const { id, nombre, email } = req.body;
        
        // Validaciones básicas
        if (!nombre || !email) {
            return res.status(400).json({ 
                success: false, 
                error: 'Nombre y email son requeridos' 
            });
        }

        const usuarioActualizado = await User.findByIdAndUpdate(
            id, 
            { nombre, email }, 
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ 
                success: false, 
                error: 'Usuario no encontrado' 
            });
        }

        res.json({ 
            success: true, 
            user: {
                id: usuarioActualizado._id,
                nombre: usuarioActualizado.nombre,
                email: usuarioActualizado.email
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Error al actualizar usuario', 
            details: error.message 
        });
    }
}

    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const usuarioEliminado = await User.findByIdAndDelete(userId);
            
            if (!usuarioEliminado) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'Usuario no encontrado' 
                });
            }
            
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ 
                error: 'Error al eliminar usuario', 
                details: error.message 
            });
        }
    }
}

module.exports = UserController;