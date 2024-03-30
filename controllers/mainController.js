const mainController = {};

mainController.showHomePage = (req, res) => {
    res.render('home');
};

module.exports = mainController;