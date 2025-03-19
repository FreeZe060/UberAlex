// models/restaurantModel.js
const DbManager = require('../config/dbManager');

class RestaurantModel {
    constructor() {
        this.dbManager = new DbManager();
    }

    async getAllRestaurants() {
        try {
            const query = `
                SELECT r.*, 
                    CASE WHEN COUNT(rr.rating) = 0 THEN NULL 
                         ELSE ROUND(AVG(rr.rating)::numeric, 1)
                    END AS avg_rating,
                    COUNT(rr.rating) AS count_rating
                FROM restaurant r
                LEFT JOIN restaurant_rating rr ON r.id = rr.restaurant_id
                GROUP BY r.id
                ORDER BY r.id
            `;
            const restaurants = await this.dbManager.query(query, []);
            return restaurants;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des restaurants depuis la base de données : ' + error.message);
        }
    }

    async getRestaurantById(restauID) {
        try {
            const query = `
                SELECT r.*, 
                    CASE WHEN COUNT(rr.rating) = 0 THEN NULL 
                         ELSE ROUND(AVG(rr.rating)::numeric, 1)
                    END AS avg_rating,
                    COUNT(rr.rating) AS count_rating
                FROM restaurant r
                LEFT JOIN restaurant_rating rr ON r.id = rr.restaurant_id
                WHERE r.id = $1
                GROUP BY r.id
            `;
            const restaurant = await this.dbManager.query(query, [restauID]);
            return restaurant[0];
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du restaurant d'indice ${restauID} depuis la base de données : ` + error.message);
        }
    }
}

module.exports = new RestaurantModel();
