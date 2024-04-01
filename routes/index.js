const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

//Page principale
router.get('/', mainController.showHomePage);

router.use('/user', require('../controllers/userController'));
// router.use('/rides', require('./rideController'));
// router.use('/payments', require('./paymentController'));

module.exports = router;
