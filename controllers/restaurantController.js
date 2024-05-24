const express = require('express');
const router = express.Router();
const restaurantModel = require('../models/restaurantModel');
const productModel = require('../models/productModel');

// Routes

router.get('/id:id', async (req, res) => {
    const logUser = res.locals.logUser;
    const restauID = req.params.id;
    const restau = await restaurantModel.getRestaurantById(restauID);
    const types = await productModel.getAllProductsTypesOfRestaurantId(restauID);
    const typesProducts = await productModel.getAllProductsOrderedByTypesOfRestaurantId(restauID);

    console.log(typesProducts);
    res.render('info_restaurant', {profile: logUser, restaurant: restau, types, typesProducts});
});

module.exports = router;