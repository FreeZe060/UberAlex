const express = require('express');
const router = express.Router();
const memberModel = require('../models/memberModel');
const orderModel = require('../models/orderModel');
const inputSanitizer = require('../config/sanitizer');


// Routes

router.get('/reg_member', (req, res) => {
    const logUser = res.locals.logUser;
    res.render('register_member', profile = logUser);
});

router.post('/create_member', async (req, res) => {
    try {
        const userData = {
            first_name: inputSanitizer(req.body.first_name),
            last_name: inputSanitizer(req.body.last_name),
            password: inputSanitizer(req.body.password),
            email: inputSanitizer(req.body.email),
            address: inputSanitizer(req.body.address) + ", " + inputSanitizer(req.body.postal) + ", " + inputSanitizer(req.body.city)
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
            email: inputSanitizer(req.body.email),
            password: inputSanitizer(req.body.password)
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

        res.render('info_profile', { profile: res.locals.logUser, panier: res.locals.cart, orders});
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes du membre :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des commandes du membre');
    }
});


router.post('/profile/update', async (req, res) => {
    const userId = inputSanitizer(req.session.logUser.id);
    const updatedData = inputSanitizer(req.body);

    try {
        const updatedUser = await memberModel.updateMember(userId, updatedData);

        req.session.logUser = updatedUser;

        res.json({ success: true, profile: updatedUser });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil :', error);
        res.json({ success: false, message: 'Une erreur s\'est produite lors de la mise à jour du profil' });
    }
});


router.get('/logout', async (req, res) => {
    req.session.logUser = undefined;
    req.session.panier = [];
    res.redirect('/');
});

//Paiement

router.post('/payment-balance', async (req, res) => {
    const { totalOrder, idRestaurant } = inputSanitizer(req.body);
    const logUser = res.locals.logUser

    if (!logUser) {
        return res.status(401).json({ success: false, message: 'Utilisateur non authentifié' });
    }
    
    const soldeUser = parseFloat(logUser.balance);

    if (isNaN(totalOrder) || totalOrder <= 0) {
        return res.status(400).json({ success: false, message: 'Montant de la commande invalide' });
    }

    if (soldeUser >= totalOrder) {
        try {
            const nouveauSolde = soldeUser - totalOrder;
            await memberModel.updateUserBalance(logUser.id, nouveauSolde);
            await orderModel.saveOrder(idRestaurant, logUser.id, 'pending', res.locals.cart);
            req.session.logUser.balance = nouveauSolde;
            req.session.cart = [];

            res.json({ success: true });
        } catch (error) {
            console.error('Erreur lors de la validation du paiement :', error);
            res.status(500).json({ success: false, message: 'Une erreur s\'est produite lors de la validation du paiement' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Votre solde n\'est pas suffisant.' });
    }
});

module.exports = router;