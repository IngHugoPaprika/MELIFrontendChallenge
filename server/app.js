const express = require('express');
const items = require('./routes/items');
const app = express();

// Definición del puerto
const port = 3001;

app.use('/api/items', items);

// Iniciar el servidor y escuchar en el puerto definido
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});