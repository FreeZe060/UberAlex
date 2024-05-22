const dbManager = require('../config/dbManager');

class OrderModel {
    constructor() {
        this.dbManager = new dbManager();
    }

    async getAllOrdersByMemberId(memberId) {
        // try {
        //     const query = 'SELECT o.id AS id_order, r.name AS rest_name, r.img AS rest_img, o.date, o.status FROM `order` o JOIN `restaurant` r ON o.id_restaurant = r.id WHERE o.id_member = ?';
        //     const orders = await this.dbManager.query(query, [memberId]);
        //     return orders || [];
        // } catch (error) {
        //     throw new Error('Erreur lors de la récupération des commandes du membre : ' + error.message);
        // }

        try {
            const query = `
                SELECT o.id AS id_order, r.name AS rest_name, r.img AS rest_img, r.rating AS rest_rating, o.date, o.status, 
                    p.id AS id_product, p.name AS product_name, p.img AS product_img, rop.quantity, p.price AS product_price 
                FROM \`order\` o 
                JOIN \`restaurant\` r ON o.id_restaurant = r.id 
                JOIN \`relations_order_product\` rop ON o.id = rop.id_order
                JOIN \`product\` p ON rop.id_product = p.id 
                WHERE o.id_member = ?`;

            const rows = await this.dbManager.query(query, [memberId]);

            const orders = rows.reduce((acc, row) => {
                const order = acc.find(o => o.id_order === row.id_order);
                const product = {
                    id_product: row.id_product,
                    product_name: row.product_name,
                    product_img: row.product_img,
                    quantity: row.quantity,
                    product_price: row.product_price
                };

                if (order) {
                    order.products.push(product);
                    order.total_price += product.product_price * product.quantity;
                } else {
                    acc.push({
                        id_order: row.id_order,
                        rest_name: row.rest_name,
                        rest_img: row.rest_img,
                        rest_rating: row.rest_rating,
                        date: row.date,
                        status: row.status,
                        total_price: product.product_price * product.quantity,
                        products: [product]
                    });
                }
                return acc;
            }, []);

            return orders;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des commandes du membre : ' + error.message);
        }
    }
}


module.exports = new OrderModel();