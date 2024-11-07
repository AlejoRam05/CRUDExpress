const mongoose = require('mongoose');


// Asegúrate de que la variable de entorno esté correctamente llamada
const dburl='mongodb://127.0.0.1:27017/crudexpress';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dburl, options)  // Usa dburl en lugar de dbURI
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((err) => {
        console.error('Error de conexión a MongoDB', err);
        process.exit(1); // Salir del proceso si no se puede conectar
    });

module.exports = mongoose;
