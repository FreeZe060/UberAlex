const dbManager = require('../config/dbManager');

class OrderModel {
    constructor() {
        this.dbManager = new dbManager();
    }

    async getOrdersByMemberId(memberId) {
        try {
            const query = 'SELECT o.*, r.img AS restaurant_img, r.name AS restaurant_name FROM `order` o JOIN `restaurant` r ON o.restaurant_id = r.id WHERE o.member_id = ?';
            const orders = await this.dbManager.query(query, [memberId]);
            return orders || [];
        } catch (error) {
            throw new Error('Erreur lors de la récupération des commandes du membre : ' + error.message);
        }
    }
}

module.exports = new OrderModel();