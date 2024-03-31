const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Routes
router.get('/home', (req, res) => {
    res.render('home');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/registration', (req, res) => {
    res.render('registration');
});

module.exports = router;