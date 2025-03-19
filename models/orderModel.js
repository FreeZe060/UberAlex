const DbManager = require('../config/dbManager');

class OrderModel {
    constructor() {
        this.dbManager = new DbManager();
    }

    async saveOrder(idRestaurant, idMember, status = 'completed', panier) {
        try {
            const queryOrder = `
                INSERT INTO orders (id_restaurant, id_member, date, status)
                VALUES ($1, $2, NOW(), $3)
                RETURNING id
            `;
            const resultOrder = await this.dbManager.query(queryOrder, [idRestaurant, idMember, status]);
            
            console.log(panier);

            const orderId = resultOrder[0].id;

            for (const item of panier) {
                const queryROP = `
                    INSERT INTO relations_order_product (id_order, id_product, quantity)
                    VALUES ($1, $2, $3)
                `;
                await this.dbManager.query(queryROP, [orderId, item.product.id, item.quantity]);
            }
        } catch (error) {
            throw new Error('Erreur lors de l\'enregistrement de la commande : ' + error.message);
        }
    }

    async getAllOrdersByMemberId(memberId) {
        try {
            const query = `
                SELECT 
                    o.id AS id_order, 
                    r.name AS rest_name, 
                    r.id AS rest_id, 
                    r.img AS rest_img, 
                    r.rating AS rest_rating, 
                    o.date, 
                    o.status,
                    p.id AS id_product, 
                    p.name AS product_name, 
                    p.img AS product_img, 
                    rop.quantity, 
                    p.price AS product_price 
                FROM orders o 
                JOIN restaurant r ON o.id_restaurant = r.id 
                JOIN relations_order_product rop ON o.id = rop.id_order
                JOIN product p ON rop.id_product = p.id 
                WHERE o.id_member = $1
            `;
            const rows = await this.dbManager.query(query, [memberId]);

            const orders = rows.reduce((acc, row) => {
                const product = {
                    id_product: row.id_product,
                    product_name: row.product_name,
                    product_img: row.product_img,
                    quantity: row.quantity,
                    product_price: parseFloat(row.product_price)
                };

                const order = acc.find(o => o.id_order === row.id_order);
                if (order) {
                    order.products.push(product);
                    order.total_price += product.product_price * product.quantity;
                } else {
                    acc.push({
                        id_order: row.id_order,
                        rest_name: row.rest_name,
                        rest_img: row.rest_img,
                        rest_rating: row.rest_rating,
                        rest_id: row.rest_id,
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
