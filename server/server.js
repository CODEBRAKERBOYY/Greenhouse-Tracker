const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/greenhouse-tracker')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

const applicationsRouter = require('./routes/applications');
app.use('/api/applications', applicationsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});