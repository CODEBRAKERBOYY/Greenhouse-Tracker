const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log('Request received!');
  res.json({ message: 'Server is working!' });
});

const PORT = 3001;

const server = app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});