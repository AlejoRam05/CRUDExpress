const { type } = require('express/lib/response');
const { toInteger } = require('lodash');
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    email: { type: stringify, required: true, unique: true}, 
});

const User = mongoose.model('User', userSchema);

const pizarraSchema = new mongoose.Schema({
    clase: {type: String, required: true},
    publicado: {type: Date, default: Date.now},
    votos: {type: Number, default: 0},
});

const Pizarra = mongoose.model('Pizarra', pizarraSchema)

module.exports = {Pizarra, User}