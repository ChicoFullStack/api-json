const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Configuração do CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// CORREÇÃO: Use apenas o caminho relativo, não a URL completa
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter); // ✅ Correto - caminho relativo

// ❌ ERRADO: app.use('https://api.meusite.com/items', itemsRouter);

app.get('/', (req, res) => {
  res.send('API com JSON como banco de dados!');
});

app.listen(port, () => {
  console.log(`Servidor rodando: http://localhost:${port}`);
});