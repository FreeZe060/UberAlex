const express = require('express');
const router = express.Router();
const memberModel = require('../models/memberModel');
const orderModel = require('../models/orderModel');
const restaurantModel = require('../models/restaurantModel');

// Routes

router.get('/reg_member', (req, res) => {
    const logUser = res.locals.logUser;
    res.render('register_member', profile = logUser);
});

router.post('/create_member', async (req, res) => {
    try {
        const userData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            email: req.body.email,
            address: req.body.address + ", " + req.body.postal + ", " + req.body.city
        };

        if (await memberModel.searchUserByEmail(userData.email)) {
            console.log("Inscription non autorisée car un membre avec cet email existe déjà");
            return res.render('register_member', { error2: 'Un membre avec cet email existe déjà' });
        }

        const newUser = await memberModel.createMember(userData);
        console.log("Membre inscrit avec succès:", newUser);

        req.session.logUser = newUser;

        res.redirect('/');

    } catch (error) {
        console.error('Erreur lors de la création du membre :', error);
        res.status(500).send('Une erreur s\'est produite lors de la création du membre');
    }
});

router.post('/login_member', async (req, res) => {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password
        };

        const User = await memberModel.authenticate(userData);
        if (User) {
            req.session.logUser = User;
            res.redirect('/');
        } else {
            res.render('register_member', { error1: 'Identifiants incorrects' });
        }

    } catch (error) {
        console.error('Erreur lors de la connexion du member :', error);
        res.status(500).send('Une erreur s\'est produite lors de la connexion du member');
    }
});

router.get('/profile', async (req, res) => {
    if (res.locals.logUser == null) {
        console.error('Erreur : Pas de profil');
        return res.redirect("/");
    }
    try {
        const orders = await orderModel.getAllOrdersByMemberId(res.locals.logUser.id);

        const restaurantID = res.locals.cart[0].product.id_restaurant;
        const restau = await restaurantModel.getRestaurantById(restaurantID);

        res.render('info_profile', { profile: res.locals.logUser, panier: res.locals.cart, orders, restau});
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes du membre :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des commandes du membre');
    }
});

router.get('/logout', async (req, res) => {
    req.session.logUser = undefined;
    req.session.panier = [];
    res.redirect('/');
});

module.exports = router;