const DbManager = require('../config/dbManager');

class RestaurantRatingModel {
    constructor() {
        this.dbManager = new DbManager();
    }

    async getRatingByMemberAndRestaurant(memberId, restaurantId) {
        try {
            const query = `
                SELECT * FROM restaurant_rating
                WHERE member_id = $1 AND restaurant_id = $2
            `;
            const result = await this.dbManager.query(query, [memberId, restaurantId]);
            return result;
        } catch (error) {
            throw new Error('Erreur lors de la récupération de la note : ' + error.message);
        }
    }
    
    async addOrUpdateRating(memberId, restaurantId, rating) {
        try {
            const updateQuery = `
                UPDATE restaurant_rating
                SET rating = $1, created_at = CURRENT_TIMESTAMP
                WHERE member_id = $2 AND restaurant_id = $3
                RETURNING *
            `;
            const updateResult = await this.dbManager.query(updateQuery, [rating, memberId, restaurantId]);
            if (updateResult.length > 0) {
                return updateResult[0];
            }
            const insertQuery = `
                INSERT INTO restaurant_rating (member_id, restaurant_id, rating)
                VALUES ($1, $2, $3)
                RETURNING *
            `;
            const insertResult = await this.dbManager.query(insertQuery, [memberId, restaurantId, rating]);
            return insertResult[0];
        } catch (error) {
            throw new Error('Erreur lors de la notation du restaurant : ' + error.message);
        }
    }
}

module.exports = new RestaurantRatingModel();
