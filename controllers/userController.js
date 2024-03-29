const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Routes
router.get('/home', (req, res) => {
    res.render('home');
});

module.exports = router;