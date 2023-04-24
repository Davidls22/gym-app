const mongoose = require('mongoose');

// Define the class schema
const classSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  maxCapacity: {
    type: Number,
    required: true
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

// Define the Class model
const Class = mongoose.model('Class', classSchema);

// Export the Class model
module.exports = Class;
