// Conexion a base de datos

const mongoose = require('mongoose')

const dburl = process.env.dburl;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

mongoose.connect(dbURI, options)
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((err) => {
    console.error('Error de conexión a MongoDB', err);
    process.exit(1); // Salir del proceso si no se puede conectar
});

module.exports = mongoose;