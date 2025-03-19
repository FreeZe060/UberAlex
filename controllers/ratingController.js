const RestaurantRatingModel = require('../models/restaurantRatingModel');
const OrderModel = require('../models/orderModel');

exports.addOrUpdateRating = async (req, res) => {
    const { memberId, restaurantId, rating } = req.body;
    try {
        // Vérifier qu'au moins une commande existe pour ce couple member/restaurant
        const orders = await OrderModel.getOrdersByMemberAndRestaurant(memberId, restaurantId);
        if (!orders || orders.length === 0) {
            return res.status(403).json({
                success: false,
                error: "Vous devez avoir passé une commande dans ce restaurant pour le noter."
            });
        }
        // Vérifier si le membre a déjà noté ce restaurant
        const existingRating = await RestaurantRatingModel.getRatingByMemberAndRestaurant(memberId, restaurantId);
        if (existingRating && existingRating.length > 0) {
            return res.status(200).json({
                success: false,
                error: "Vous avez déjà noté la commande."
            });
        }
        // Si aucune note n'existe, ajouter la note
        const result = await RestaurantRatingModel.addRating(memberId, restaurantId, rating);
        res.status(200).json({ success: true, rating: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
