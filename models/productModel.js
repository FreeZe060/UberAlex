const dbManager = require('../config/dbManager');

class ProductModel {
    constructor() {
        this.dbManager = new dbManager();
    }

    async getAllProductsTypesOfRestaurantId(restaurantId) {
        try {
            const query = `SELECT DISTINCT type FROM product WHERE id_restaurant = ? 
                ORDER BY
                    CASE
                        WHEN type = 'Menus' THEN 1
                        WHEN type = 'Unités' THEN 2
                        WHEN type = 'Petits Prix' THEN 3
                        WHEN type = 'Boissons' THEN 4
                        WHEN type = 'Desserts' THEN 5
                        ELSE 6
                    END;`;
            const result = await this.dbManager.query(query, [restaurantId]);
            const types = result.map(row => row.type);
            return types;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des types de produits : ' + error.message);
        }
    }

    async getAllProductsOrderedByTypesOfRestaurantId(restaurantId) {
        try {
            const query = `
            SELECT type, id, name, price, img
            FROM product
            WHERE id_restaurant = ?
            ORDER BY
                CASE
                    WHEN type = 'Menus' THEN 1
                    WHEN type = 'Unités' THEN 2
                    WHEN type = 'Petits Prix' THEN 3
                    WHEN type = 'Boissons' THEN 4
                    WHEN type = 'Desserts' THEN 5
                    ELSE 6
                END`;
            const result = await this.dbManager.query(query, [restaurantId]);

            const productsByType = {};
            result.forEach(row => {
                const { type, id, name, price, img } = row;
                const product = { id, name, price, img };

                if (!productsByType[type]) {
                    productsByType[type] = [];
                }
                productsByType[type].push(product);
            });

            return productsByType;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des types de produits : ' + error.message);
        }
    }


    async getProductByID(productId) {
        try {
            const query = 'SELECT * FROM product WHERE id = ?';
            const result = await this.dbManager.query(query, [productId]);
            return result[0];
        } catch (error) {
            throw new Error('Erreur lors de la récupération du produit : ' + error.message);
        }
    }
}

module.exports = new ProductModel();
