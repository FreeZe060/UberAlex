const DbManager = require('../config/dbManager');

class FavoriteRestaurantModel {
    constructor() {
        this.dbManager = new DbManager();
    }

    async getFavoritesByMemberId(memberId) {
        try {
            const query = `
                SELECT fr.*, r.name, r.img, 
                       (SELECT CASE WHEN COUNT(rr.rating)=0 THEN NULL 
                                    ELSE ROUND(AVG(rr.rating)::numeric,1)
                               END 
                        FROM restaurant_rating rr
                        WHERE rr.restaurant_id = r.id
                       ) AS avg_rating
                FROM favorite_restaurant fr
                JOIN restaurant r ON fr.restaurant_id = r.id
                WHERE fr.member_id = $1
            `;
            const result = await this.dbManager.query(query, [memberId]);
            return result;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des favoris : ' + error.message);
        }
    }

    async addFavorite(memberId, restaurantId) {
        try {
            const query = `
                INSERT INTO favorite_restaurant (member_id, restaurant_id)
                VALUES ($1, $2)
                RETURNING *
            `;
            const result = await this.dbManager.query(query, [memberId, restaurantId]);
            return result[0];
        } catch (error) {
            throw new Error('Erreur lors de l\'ajout du favori : ' + error.message);
        }
    }

    async removeFavorite(memberId, restaurantId) {
        try {
            const query = `
                DELETE FROM favorite_restaurant
                WHERE member_id = $1 AND restaurant_id = $2
                RETURNING *
            `;
            const result = await this.dbManager.query(query, [memberId, restaurantId]);
            return result[0];
        } catch (error) {
            throw new Error('Erreur lors de la suppression du favori : ' + error.message);
        }
    }
}

module.exports = new FavoriteRestaurantModel();
