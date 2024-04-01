const express = require('express');
const router = express.Router();
const memberModel = require('../models/memberModel');

// Routes

router.get('/reg_member', (req, res) => {
    const logUser = res.locals.logUser;
    res.render('register_member', profile = logUser);
});

router.post('/create_member', async (req, res) => {
    try {
        const userData = {
            first_name: req.body.first_name,
            name: req.body.name,
            password: req.body.password,
            mail: req.body.mail,
            address: req.body.address + "_" + req.body.postal + "_" + req.body.city
        };

        if (await memberModel.searchUserByEmail(userData.mail)){
            console.log("Inscription non autorisé car un membre avec cet email existe déjà");
            return res.render('register_member', { error: 'Un membre avec cet email existe déjà' });
        }

        const newUser = await memberModel.createMember(userData);

        req.session.logUser = newUser;

        res.redirect('/');

    } catch (error) {
        console.error('Erreur lors de la création du membre :', error);
        res.status(500).send('Une erreur s\'est produite lors de la création du membre');
    }

    // const selectedImg = req.body.selectedImg;
    // // Convertir la chaîne base64 en données binaires
    // const imageBuffer = Buffer.from(selectedImg, 'base64');
    // const fileName = `${username}_${Date.now()}.png`;
    // const filePath = `./assets/image_user/${fileName}`;

    // // Hash du mot de passe
    // const hashedPassword = await bcrypt.hash(password, 10);
});

router.post('/login_member', async (req, res) => {
    
});


module.exports = router;