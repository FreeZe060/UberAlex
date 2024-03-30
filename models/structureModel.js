const DbManager = require('../config/dbManager');

class StructureModel {

    constructor() {
        this.dbManager = new DbManager();
    }

    async getAllStructures() {
        this.dbManager.connect();
        try {
            const structures = await this.dbManager.query('SELECT * FROM structures');
            return structures;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des structures depuis la base de données : ' + error.message);
        } finally {
            this.dbManager.close();
        }
    }

}

module.exports = StructureModel;