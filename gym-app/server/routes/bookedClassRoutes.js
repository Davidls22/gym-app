const express = require('express');
const router = express.Router();
const { getAllBookedClasses, createBookedClass, deleteBookedClass } = require('../controllers/bookedClassController');

// Define routes
router.get('/api/booked-classes', getAllBookedClasses);
router.post('/api/booked-classes', createBookedClass);
router.delete('/api/booked-classes/:classId', deleteBookedClass);

module.exports = router;
