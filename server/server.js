const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { initializeSchedulers } = require('./services/notificationScheduler');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/greenhouse-tracker';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ MongoDB Connected');
    initializeSchedulers();
  })
  .catch((err) => console.error('❌ MongoDB Error:', err));

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const applicationsRouter = require('./routes/applications');
app.use('/api/applications', applicationsRouter);

const aiRouter = require('./routes/ai');
app.use('/api/ai', aiRouter);

const analyticsRouter = require('./routes/analytics');
app.use('/api/analytics', analyticsRouter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

const clientDistPath = path.join(__dirname, '..', 'client', 'dist');

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      message: 'Server is working!',
      note: 'client/dist was not found. Run npm run build from the project root before production start.',
    });
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
