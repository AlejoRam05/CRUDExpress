const express = require("express");
const app = express();
const PORT = 5000



app.get('/', (req, res) => {
    res.send('Hello World desde Express!');
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});