const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect('mongodb://localhost:27017/FlightData')
.then(() => console.log('Connected to MongoDB\n'))
.catch((err) => console.error('MongoDB connection error:\n', err));
const app = express();
const port = 8080;

const flightDataSchema = new mongoose.Schema({
    altitude: Number,
    hsi: Number,
    adi: Number,
});
  
const FlightData = mongoose.model('FlightData', flightDataSchema);

// Middleware so the server can read JSON
app.use(express.json());
app.use(cors());

// Test route to check if server works
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/api/data', async (req, res) => {
    try {
      const { altitude, hsi, adi } = req.body;
      console.log(`altitude: ${altitude} hsi (compass): ${hsi} adi (attitude indicator): ${adi}`);
      // Check all values exist
      if (altitude === undefined || hsi === undefined || adi === undefined) {
        console.log('Error detected code 400');
        return res.status(400).json({error: 'Missing required fields'});
      }
  
      // Create and save the data
      const newEntry = new FlightData({altitude, hsi, adi});
      await newEntry.save();
  
      // Send back a success response
      res.status(201).json({message: 'Data saved successfully'});
      console.log('successfully recived POST request');
    } catch (err) {
      console.error('Error saving data:', err);
      res.status(500).json({error: 'Internal server error'});
    }
  });


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});