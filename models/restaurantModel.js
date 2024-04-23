const dbManager = require('../config/dbManager');
// const binaryToPng = require('../config/binaryToPng');

class RestaurantModel {
    constructor() {
        this.dbManager = new dbManager();
    }

    async getAllRestaurants() {
        this.dbManager.connect();
        try {
            const restaurants = await this.dbManager.query('SELECT * FROM restaurant');
            return restaurants;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des restaurants depuis la base de données : ' + error.message);
        }
    }

    async getRestaurantById(restauID) {
        this.dbManager.connect();
        try {
            const restaurant = await this.dbManager.query('SELECT * FROM restaurant where id = ?', restauID);
            return restaurant[0];
        } catch (error) {
            throw new Error('Erreur lors de la récupération du restaurant d\'indice ${restauID} depuis la base de données : ' + error.message);
        }
    }
}

module.exports = new RestaurantModel();