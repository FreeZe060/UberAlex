const StructureModel = require('../models/structureModel');

const mainController = {};

mainController.showHomePage = async (req, res) => {
    const structureModel = new StructureModel();
    const structures = await structureModel.getAllStructures();
    res.render('home', { structures });
};

module.exports = mainController;