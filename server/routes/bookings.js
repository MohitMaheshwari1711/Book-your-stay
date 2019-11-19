const express = require('express');
const router = express.Router();

const BookingCtrl = require('../controllers/booking');
const UserCtrl = require('../controllers/user');

router.post('', UserCtrl.authMiddleware, BookingCtrl.createBooking);


module.exports = router;