const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const employeeRoutes = require('./routes/employeeRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.status(200).send('OK'));
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;

// Gán cứng chuỗi kết nối chuẩn vào đây để không bị lỗi file .env nữa
const MONGODB_URI = 'mongodb+srv://lengocbaotran1912_db_user:nE1BzzuyOkCqwLPq@cluster0.onlon.mongodb.net/237701_LeNgocBaoTran?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));