const mongoose = require('mongoose');

// Esquema de la pizarra (como subdocumento de un usuario)
const pizarraSchema = new mongoose.Schema({
    clase: { type: String, required: true },
    publicado: { type: Date, default: Date.now },
});

// Esquema del usuario
const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pizarras: [pizarraSchema],
    votos: { type: Number, default: 0 } // Arreglo de pizarras asociadas al usuario
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
