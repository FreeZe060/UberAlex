const DbManager = require('../config/dbManager');

class ProductModel {
    constructor() {
        this.dbManager = new DbManager();
    }

    async getAllProductsTypesOfRestaurantId(restaurantId) {
        try {
            const query = `
                SELECT type FROM (
                    SELECT DISTINCT type,
                        CASE
                            WHEN type = 'Menus' THEN 1
                            WHEN type = 'Unités' THEN 2
                            WHEN type = 'Petits Prix' THEN 3
                            WHEN type = 'Boissons' THEN 4
                            WHEN type = 'Desserts' THEN 5
                            ELSE 6
                        END AS sort_order
                    FROM product
                    WHERE id_restaurant = $1
                ) AS sub
                ORDER BY sort_order
            `;
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
                WHERE id_restaurant = $1
                ORDER BY
                    CASE
                        WHEN type = 'Menus' THEN 1
                        WHEN type = 'Unités' THEN 2
                        WHEN type = 'Petits Prix' THEN 3
                        WHEN type = 'Boissons' THEN 4
                        WHEN type = 'Desserts' THEN 5
                        ELSE 6
                    END
            `;
            const result = await this.dbManager.query(query, [restaurantId]);

            const productsByType = {};
            result.forEach(row => {
                const { type, id, name, price, img } = row;
                const product = { id, name, price: parseFloat(price), img };

                if (!productsByType[type]) {
                    productsByType[type] = [];
                }
                productsByType[type].push(product);
            });

            return productsByType;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des produits triés par type : ' + error.message);
        }
    }

    async getProductByID(productId) {
        try {
            const query = 'SELECT * FROM product WHERE id = $1';
            const result = await this.dbManager.query(query, [productId]);
            if (result && result.length > 0) {
                const product = result[0];
                product.price = parseFloat(product.price);
                return product;
            }
            return null;
        } catch (error) {
            throw new Error('Erreur lors de la récupération du produit : ' + error.message);
        }
    }
}

module.exports = new ProductModel();
