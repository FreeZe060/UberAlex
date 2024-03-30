const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
router.use('/users', require('../controllers/userController'));
// router.use('/rides', require('./rideController'));
// router.use('/payments', require('./paymentController'));

//Page principale
router.get('/', mainController.showHomePage);

module.exports = router;
