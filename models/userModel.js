const dbManager = require('../config/dbManager');

class UserModel {
    constructor() {
        this.dbManager = new dbManager();
    }

    async createMember(userData) {
        this.dbManager.connect();
        try {
            const query = 'INSERT INTO member (first_name, name, password, mail) VALUES (?, ?, ?, ?)';
            const newUser = await this.dbManager.query(query, [userData.first_name, userData.name, userData.password, userData.mail]);
            return newUser;
        } catch (error) {
            throw new Error('Erreur lors de la création du membre : ' + error.message);
        } finally {
            this.dbManager.close();
        }
    }

    // Autres méthodes du modèle utilisateur (ex: updateMember, deleteMember, etc.)
}

module.exports = new UserModel();
