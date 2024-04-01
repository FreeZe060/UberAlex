const dbManager = require('../config/dbManager');

class MemberModel {
    constructor() {
        this.dbManager = new dbManager();
        this.dbManager.connect();
    }

    async createMember(userData) {
        let newUser = null;
        try {
            const query = 'INSERT INTO member (first_name, name, password, mail, address) VALUES (?, ?, ?, ?, ?)';
            const result = await this.dbManager.query(query, [userData.first_name, userData.name, userData.password, userData.mail, userData.address]);

            if (result && result.insertId) {
                const newUserQuery = 'SELECT * FROM member WHERE id = ?';
                newUser = await this.dbManager.query(newUserQuery, [result.insertId]);
            }

            return newUser[0];
        } catch (error) {
            throw new Error('Erreur lors de la création du membre : ' + error.message);
        }
    }

    async searchUserByEmail(mail) {
        try {
            const query = 'SELECT * FROM member WHERE mail = ?';
            const result = await this.dbManager.query(query, [mail]);
            return result.length > 0 ? result[0] : false;
        } catch (error) {
            throw new Error('Erreur lors de la vérification de l\'existence de l\'utilisateur : ' + error.message);
        }
    }

    destroy() {
        this.dbManager.close();
    }
}

module.exports = new MemberModel();
