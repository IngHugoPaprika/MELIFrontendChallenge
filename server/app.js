const express = require('express');
const items = require('./routes/items');
const app = express();
const port = 3001;

app.use('/api/items', items);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});