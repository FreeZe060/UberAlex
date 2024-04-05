const express = require('express');
const router = express.Router();
const restaurateurModel = require('../models/restaurateurModel');

// Routes

router.get('/reg_restaurateur', (req, res) => {
    const logUser = res.locals.logUser;
    res.render('register_restaurateur', profile = logUser);
});

router.post('/create_restaurateur', async (req, res) => {
    try {
        const userData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            email: req.body.email,
            address: req.body.address + "_" + req.body.postal + "_" + req.body.city
        };

        // Vérifiez si l'utilisateur existe déjà
        if (await restaurateurModel.searchUserByEmail(userData.email)) {
            console.log("Inscription non autorisée car un restaurateur avec cet email existe déjà");
            return res.render('register_restaurateur', { error2: 'Un restaurateur avec cet email existe déjà' });
        }

        // Création du nouvel utilisateur
        const newRestaurateur = await restaurateurModel.createRestaurateur(userData);
        console.log("Restaurateur inscrit avec succès:", newRestaurateur);

        req.session.logUser = newRestaurateur;

        res.redirect('/');

    } catch (error) {
        console.error('Erreur lors de la création du restaurateur :', error);
        res.status(500).send('Une erreur s\'est produite lors de la création du restaurateur');
    }
});

router.post('/login_restaurateur', async (req, res) => {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password
        };

        // Vérifiez les informations de connexion
        const restaurateur = await restaurateurModel.authenticate(userData);
        if (restaurateur) {
            req.session.logUser = restaurateur;
            res.redirect('/');
        } else {
            res.render('login', { error1: 'Identifiants incorrects' });
        }

    } catch (error) {
        console.error('Erreur lors de la connexion du restaurateur :', error);
        res.status(500).send('Une erreur s\'est produite lors de la connexion du restaurateur');
    }
});

module.exports = router;