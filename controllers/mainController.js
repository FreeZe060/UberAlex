const RestaurantModel = require('../models/structureModel');

const mainController = {};

mainController.showHomePage = async (req, res) => {
    const restaurantModel = new RestaurantModel();
    try {
        const restaurants = await restaurantModel.getAllRestaurants();
        const logUser = res.locals.logUser;
        console.log("Redirect to: /");
        console.log("Recover all restaurants:", restaurants.length);
        res.render('home', { restaurants, profile: logUser });
    } catch (error) {
        console.error('Erreur lors de la récupération des restaurants :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des restaurants');
    }
};

module.exports = mainController;