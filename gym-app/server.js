const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// Import routers for handling API requests
const classRouter = require('./server/routes/classRoutes');
const registerRouter = require('./server/routes/registerRoutes');
const bookedClassesRoute = require("./server/routes/bookedClassRoutes");



// Use middleware for handling JSON data in requests
app.use(express.json());

// Set port for the app to listen on
const port = process.env.PORT || 8082;

// Connect to MongoDB
const uri = 'mongodb+srv://davidsugden1:GYMAPP@gymcluster.lzsznn2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB', err.message);
    process.exit(1);
  });

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected from MongoDB');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

// Set up middleware
app.use(cors());

// Set up routes
app.use('/api/', registerRouter);
app.use('/api/classes', classRouter);
app.use('/', bookedClassesRoute);

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
