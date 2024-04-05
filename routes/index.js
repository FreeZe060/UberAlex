const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

//Page principale
router.get('/', mainController.showHomePage);

router.use('/user', require('../controllers/memberController'));
router.use('/user', require('../controllers/restaurateurController'));
// router.use('/user', require('../controllers/structureController'));
// router.use('/rides', require('./rideController'));
// router.use('/payments', require('./paymentController'));

module.exports = router;
