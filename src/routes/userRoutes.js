/*
Endpoints API

Implementa una API con las siguientes rutas:
GET /usuarios - Retorna todos los usuarios de la tabla usuarios.
GET /usuarios/{id} - Retorna un usuario específico según su id.
POST /usuarios - Crea un nuevo usuario con los datos proporcionados en el cuerpo de la solicitud (nombre, email, edad).
PUT /usuarios/{id} - Actualiza los datos de un usuario existente según su id, con los datos proporcionados en el cuerpo de la solicitud.
DELETE /usuarios/{id} - Elimina un usuario específico según su id.
*/
const { error } = require("console");
const express = require("express");
const routes = express.Router();
const db = require("../models/userModels.js");


routes.get("/usuarios", (req, res) => {
    db.all("SELECT * FROM usuarios", [], (err, rows) =>{
        if (err) {
            res.status(500).json({error : err.message});
            return;
        }
        res.json(rows);
    });
})

routes.get("/usuario/:id", (req,res) =>{

})

routes.post("/usuarios", (req, res) => {
    const { nombre, email } = req.body;
    db.run("INSERT INTO usuarios (nombre, email) VALUES (?, ?)", [nombre, email], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, nombre, email });
    });
});

routes.put("/usuario/:id", (req, res) => {

})

routes.delete("/usuario/:id", (req, res) =>{

})


module.exports = routes;