const DbManager = require('../config/dbManager');
// const binaryToPng = require('../config/binaryToPng');

class StructureModel {

    constructor() {
        this.dbManager = new DbManager();
    }

    async getAllStructures() {
        this.dbManager.connect();
        try {
            const structures = await this.dbManager.query('SELECT * FROM structure');
            // structures.forEach(async structure => {
            //     console.log(structure);
            //     binaryToPng(structure.img, `./assets/img/save/${structure.name}_logo.png`)
            //     fs.writeFileSync(`./assets/img/save/${structure.name}_logo.jpg`, structure.img);
            // });
            return structures;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des structures depuis la base de données : ' + error.message);
        } finally {
            this.dbManager.close();
        }
    }

}

module.exports = StructureModel;