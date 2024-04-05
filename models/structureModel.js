const DbManager = require('../config/dbManager');
// const binaryToPng = require('../config/binaryToPng');

class RestaurantModel {
    constructor() {
        this.dbManager = new DbManager();
    }

    async getAllRestaurants() {
        this.dbManager.connect();
        try {
            const restaurants = await this.dbManager.query('SELECT name, address, rating FROM restaurant');
            return restaurants;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des restaurants depuis la base de données : ' + error.message);
        } finally {
            this.dbManager.close();
        }
    }
}

module.exports = RestaurantModel;