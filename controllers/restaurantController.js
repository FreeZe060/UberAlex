const express = require('express');
const router = express.Router();
const restaurantModel = require('../models/restaurantModel');

// Routes

router.get('/id:id', async (req, res) => {
    const logUser = res.locals.logUser;
    const restauID = req.params.id;
    const restau = await restaurantModel.getRestaurantById(restauID);
    console.log(restau);
    res.render('info_restaurant', {profile: logUser, restaurant: restau});
});

module.exports = router;