const express = require('express');
const router = express.Router();

router.use('/users', require('../controllers/userController'));
// router.use('/rides', require('./rideController'));
// router.use('/payments', require('./paymentController'));

module.exports = router;
