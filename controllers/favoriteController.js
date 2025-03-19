const FavoriteRestaurantModel = require('../models/favoriteRestaurantModel');

exports.addFavorite = async (req, res) => {
    const { memberId, restaurantId } = req.body;
    try {
        const favorite = await FavoriteRestaurantModel.addFavorite(memberId, restaurantId);
        res.status(200).json({ success: true, favorite });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.removeFavorite = async (req, res) => {
    const { memberId, restaurantId } = req.body;
    try {
        const removed = await FavoriteRestaurantModel.removeFavorite(memberId, restaurantId);
        res.status(200).json({ success: true, removed });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
