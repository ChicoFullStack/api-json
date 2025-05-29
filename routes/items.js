const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../utils/dbHelper');

// GET todos os itens
router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.items);
});

// GET item por ID
router.get('/:id', (req, res) => {
  const db = readDB();
  const item = db.items.find(i => i.id === parseInt(req.params.id));
  
  if (!item) return res.status(404).json({ message: 'Item não encontrado' });
  res.json(item);
});

// POST criar novo item
router.post('/', (req, res) => {
  const db = readDB();
  const newItem = {
    id: Date.now(), // ID baseado em timestamp
    ...req.body
  };
  
  db.items.push(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

// PUT atualizar item
router.put('/:id', (req, res) => {
  const db = readDB();
  const index = db.items.findIndex(i => i.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Item não encontrado' });
  }
  
  db.items[index] = { ...db.items[index], ...req.body };
  writeDB(db);
  res.json(db.items[index]);
});

// DELETE remover item
router.delete('/:id', (req, res) => {
  const db = readDB();
  const initialLength = db.items.length;
  
  db.items = db.items.filter(i => i.id !== parseInt(req.params.id));
  
  if (db.items.length === initialLength) {
    return res.status(404).json({ message: 'Item não encontrado' });
  }
  
  writeDB(db);
  res.status(204).send();
});

module.exports = router;