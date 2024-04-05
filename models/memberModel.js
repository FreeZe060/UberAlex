const dbManager = require('../config/dbManager');

class MemberModel {
    constructor() {
        this.dbManager = new dbManager();
        this.dbManager.connect();
    }

    async createMember(userData) {
        let newUser = null;
        try {
            const query = 'INSERT INTO member (first_name, last_name, password, email, address) VALUES (?, ?, ?, ?, ?)';
            const result = await this.dbManager.query(query, [userData.first_name, userData.last_name, userData.password, userData.email, userData.address]);

            if (result && result.insertId) {
                const newUserQuery = 'SELECT * FROM member WHERE id = ?';
                newUser = await this.dbManager.query(newUserQuery, [result.insertId]);
            }

            return newUser[0];
        } catch (error) {
            throw new Error('Erreur lors de la création du membre : ' + error.message);
        }
    }

    async searchUserByEmail(email) {
        try {
            const query = 'SELECT * FROM member WHERE email = ?';
            const result = await this.dbManager.query(query, [email]);
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
