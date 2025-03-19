const restaurantModel = require('../models/restaurantModel');
const FavoriteRestaurantModel = require('../models/favoriteRestaurantModel');

const mainController = {};

mainController.showHomePage = async (req, res) => {
    try {
        const restaurants = await restaurantModel.getAllRestaurants();
        const logUser = res.locals.logUser;

        let favorites = [];
        if (req.session.logUser) {
            favorites = await FavoriteRestaurantModel.getFavoritesByMemberId(req.session.logUser.id);
        }
        console.log("Redirect to: /");
        console.log("Recover all restaurants:", restaurants.length);

        const restaurantsWithFavorites = restaurants.map(r => {
            return {
                ...r,
                isFavorite: favorites.some(fav => fav.restaurant_id === r.id)
            };
        });
        
        res.render('home', { restaurants: restaurantsWithFavorites, profile: logUser, panier: res.locals.cart});
    } catch (error) {
        console.error('Erreur lors de la récupération des restaurants :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des restaurants');
    }
};

module.exports = mainController;