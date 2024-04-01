const StructureModel = require('../models/structureModel');

const mainController = {};

mainController.showHomePage = async (req, res) => {
    const structureModel = new StructureModel();
    const structures = await structureModel.getAllStructures();
    const logUser = res.locals.logUser;
    console.log("redirect to : /")
    console.log("Recover all structures :", structures.length, "of them");
    res.render('home', { structures, profile: logUser });
};

module.exports = mainController;