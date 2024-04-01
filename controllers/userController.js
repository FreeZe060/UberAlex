const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Routes

router.get('/reg_restaurateur', (req, res) => {
    const logUser = res.locals.logUser;
    res.render('register_restaurateur', profile = logUser);
});

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

        console.log(password);
        const newUser = await userModel.createMember(userData);
        console.log(newUser);

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

    // // Insérer l'utilisateur dans la base de données avec le nom, le mot de passe haché et l'image choisie
    // connection.query('INSERT INTO profile (username, hashed_password, name, image, money) VALUES (?, ?, ?, ?, ?)', [username, hashedPassword, nom, fileName || null, 10000], (error, results) => {
    //     if (error) {
    //         console.error('Erreur lors de l\'inscription : ' + error.message);
    //         return res.json({ success: false, message: 'Erreur lors de l\'inscription' });
    //     }

    //     fs.writeFile(filePath, imageBuffer, (writeError) => {
    //         if (writeError) {
    //             console.error('Erreur lors de l\'enregistrement de l\'image : ' + writeError.message);
    //             return res.json({ success: false, message: 'Erreur lors de l\'enregistrement de l\'image' });
    //         }

    //         console.log('Image enregistrée avec succès sous le nom :', fileName);
    //         console.log('Utilisateur inscrit avec succès. ID de l\'utilisateur :', results.insertId);
    //         // return res.json({ success: true, message: 'Inscription réussie' });
            
    //     });
    //     res.redirect('/');
    // });
    res.redirect('/');
});

module.exports = router;