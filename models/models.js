const mongoose = require('mongoose');


// Esquema del usuario
const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    votos: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
