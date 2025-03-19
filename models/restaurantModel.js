const DbManager = require('../config/dbManager');

class RestaurantModel {
    constructor() {
        this.dbManager = new DbManager();
    }

    async getAllRestaurants() {
        try {
            const restaurants = await this.dbManager.query('SELECT * FROM restaurant');
            return restaurants;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des restaurants depuis la base de données : ' + error.message);
        }
    }

    async getRestaurantById(restauID) {
        try {
            const restaurant = await this.dbManager.query('SELECT * FROM restaurant WHERE id = $1', [restauID]);
            return restaurant[0];
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du restaurant d'indice ${restauID} depuis la base de données : ` + error.message);
        }
    }
}

module.exports = new RestaurantModel();