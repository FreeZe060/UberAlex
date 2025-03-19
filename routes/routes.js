const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const favoriteController = require('../controllers/favoriteController');
const ratingController = require('../controllers/ratingController');

//Page principale
router.get('/', mainController.showHomePage);

router.use('/user', require('../controllers/memberController'));
router.use('/user', require('../controllers/restaurateurController'));
router.use('/user', require('../controllers/cartController'));
router.use('/restaurant', require('../controllers/restaurantController'));
router.post('/favorites/restaurant', favoriteController.addFavorite);
router.delete('/favorites/restaurant', favoriteController.removeFavorite);
router.post('/ratings/restaurant', ratingController.addOrUpdateRating);
// router.use('/rides', require('./rideController'));
// router.use('/payments', require('./paymentController'));

module.exports = router;
