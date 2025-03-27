const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/monitor', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => console.log('✅ MongoDB connected'));