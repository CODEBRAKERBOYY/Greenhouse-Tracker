const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { initializeSchedulers } = require('./services/notificationScheduler');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    initializeSchedulers();
  })
  .catch((err) => console.error('❌ MongoDB Error:', err));

const applicationsRouter = require('./routes/applications');
app.use('/api/applications', applicationsRouter);

const aiRouter = require('./routes/ai');
app.use('/api/ai', aiRouter);

const analyticsRouter = require('./routes/analytics');
app.use('/api/analytics', analyticsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});