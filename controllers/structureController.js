const express = require('express');
const router = express.Router();
const userModel = require('../models/memberModel');

// Routes

router.get('/reg_restaurateur', (req, res) => {
    const logUser = res.locals.logUser;
    res.render('register_restaurateur', profile = logUser);
});

module.exports = router;