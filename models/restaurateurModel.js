const DbManager = require('../config/dbManager');

class RestaurateurModel {
    constructor() {
        this.dbManager = new DbManager();
    }

    async createRestaurateur(userData) {
        try {
            const query = `
                INSERT INTO restaurateur (first_name, last_name, password, email, address)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `;
            const result = await this.dbManager.query(query, [
                userData.first_name,
                userData.last_name,
                userData.password,
                userData.email,
                userData.address
            ]);
            return result[0];
        } catch (error) {
            throw new Error('Erreur lors de la création du compte restaurateur : ' + error.message);
        }
    }

    async searchUserByEmail(email) {
        try {
            const query = 'SELECT * FROM restaurateur WHERE email = $1';
            const result = await this.dbManager.query(query, [email]);
            return result.length > 0 ? result[0] : false;
        } catch (error) {
            throw new Error('Erreur lors de la vérification de l\'existence de l\'utilisateur : ' + error.message);
        }
    }

    async authenticate(userData) {
        try {
            const query = 'SELECT * FROM restaurateur WHERE email = $1 AND password = $2';
            const result = await this.dbManager.query(query, [userData.email, userData.password]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            throw new Error('Erreur lors de l\'authentification du restaurateur : ' + error.message);
        }
    }
}

module.exports = new RestaurateurModel();