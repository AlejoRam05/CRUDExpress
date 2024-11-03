// Esquama de modelo para la base de datos
/*
Estructura de la Base de Datos

Crea una base de datos llamada usuarios.db.
Define una tabla usuarios con los siguientes campos:
id (entero, clave primaria, autoincremental)
nombre (texto, obligatorio)
email (texto, obligatorio, debe ser único y en formato de correo electrónico)
fecha_registro (fecha, se asigna automáticamente al crear el usuario)
*/

const { create } = require('domain');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      fecha_registro TEXT DEFAULT (datetime('now', 'localtime'))
    )`, (err) => {
      if (err) {
        console.error('Error al crear la tabla usuarios:', err);
      } else {
        console.log('Tabla usuarios creada o ya existente.');
      }
    });
    // Insertar un usuario de prueba (opcional)
    db.run(`INSERT INTO usuarios (nombre, email) VALUES (?, ?)`, ['Nombre de prueba', 'email@prueba.com'], (err) => {
        if (err) {
            console.error('Error al insertar el usuario:', err);
        } else {
            console.log('Usuario insertado correctamente.');
        }
        });
});

module.exports = db