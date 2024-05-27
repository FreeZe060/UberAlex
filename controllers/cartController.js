const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');
const restaurantModel = require('../models/restaurantModel');

//Routes

router.get('/cart', async (req, res) => {
    if (res.locals.logUser == null || res.locals.cart.length == 0) {
        return res.redirect('/');
    }

    const restaurantID = res.locals.cart[0].product.id_restaurant;
    const restaurant = await restaurantModel.getRestaurantById(restaurantID);

    res.render('panier', { profile: res.locals.logUser, panier: res.locals.cart, restaurant});

});

router.post('/add-to-cart', async (req, res) => {
    const { productId, quantity } = req.body;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    try {
        const product = await productModel.getProductByID(productId);

        if (req.session.cart.length > 0 && req.session.cart[0].product.id_restaurant != product.id_restaurant){
            req.session.cart = [{ product, quantity: parseInt(quantity) }]
            console.log("USER id", req.session.logUser.id, ": Ajout au panier, un produit d'ID", productId, "d'un autre restaurant");
            return res.redirect(req.headers.referer);
        }

        const existProductIndex = req.session.cart.findIndex(item => item.product.id.toString() === productId);

        if (existProductIndex !== -1) {
            req.session.cart[existProductIndex].quantity += parseInt(quantity);
        } else {
            req.session.cart.push({ product, quantity: parseInt(quantity) });
        }

        console.log("USER id", req.session.logUser.id, ": Ajout au panier, un produit d'ID", productId);
        res.redirect(req.headers.referer);
    } catch (error) {
        console.error('Erreur lors de l\'ajout au panier :', error);
        res.status(500).send('Une erreur s\'est produite lors de l\'ajout au panier');
    }
});

router.post('/remove-from-cart', async (req, res) => {
    const { productId } = req.body;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    try {
        const existProductIndex = req.session.cart.findIndex(item => item.product.id === parseInt(productId));

        if (existProductIndex !== -1) {
            if (req.session.cart[existProductIndex].quantity > 1) {
                req.session.cart[existProductIndex].quantity -= 1;
                console.log("USER id", req.session.logUser.id, ": Enleve du panier, un produit d'ID", productId);
            } else {
                req.session.cart.splice(existProductIndex, 1);
                console.log("USER id", req.session.logUser.id, ": Supprime du panier, le produit d'ID", productId);
            }

        } else {
            console.log("Le produit d'ID", productId, "n'existe pas dans le panier.");
        }

        res.redirect(req.headers.referer);
    } catch (error) {
        console.error('Erreur lors de la suppression du panier :', error);
        res.status(500).send('Une erreur s\'est produite lors de la suppression du panier');
    }
});
module.exports = router;