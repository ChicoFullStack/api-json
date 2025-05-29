const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());

// Rotas
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API com JSON como banco de dados!');
});

app.listen(port, () => {
  console.log(`Servidor rodando: http://localhost:${port}`);
});