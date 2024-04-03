const DbManager = require('../config/dbManager');
// const binaryToPng = require('../config/binaryToPng');

class StructureModel {

    constructor() {
        this.dbManager = new DbManager();
        this.dbManager.connect();
    }

    async getAllStructures() {
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
        }
    }

    async createStructure(structureData) {
        let newStructure = null;
        try {
            const query = 'INSERT INTO structure (desc, name, password, mail, address) VALUES (?, ?, ?, ?, ?)';
            const result = await this.dbManager.query(query, [structureData.desc, structureData.name, structureData.password, structureData.mail, structureData.address]);

            if (result && result.insertId) {
                const newStructureQuery = 'SELECT * FROM structure WHERE id = ?';
                newStructure = await this.dbManager.query(newStructureQuery, [result.insertId]);
            }

            return newStructure[0];
        } catch (error) {
            throw new Error('Erreur lors de la création du membre : ' + error.message);
        }
    }

    async searchStructureByEmail(mail) {
        try {
            const query = 'SELECT * FROM member WHERE mail = ?';
            const result = await this.dbManager.query(query, [mail]);
            return result.length > 0 ? result[0] : false;
        } catch (error) {
            throw new Error('Erreur lors de la vérification de l\'existence de l\'utilisateur : ' + error.message);
        }
    }

    async checkPassword(structureData) {
        try {
            const query = 'SELECT * FROM member WHERE mail = ?';
            const result = await this.dbManager.query(query, [structureData.mail]);
            return result[0].password == structureData.password ? true : false;
        } catch (error) {
            throw new Error('Erreur lors de la vérification de l\'existence de l\'utilisateur : ' + error.message);
        }
    }

    destroy() {
        this.dbManager.close();
    }

}

module.exports = StructureModel;