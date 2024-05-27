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

    async authenticate(userData) {
        try {
            const query = 'SELECT * FROM member WHERE email = ? AND password = ?';
            const result = await this.dbManager.query(query, [userData.email, userData.password]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            throw new Error('Erreur lors de l\'authentification du membre : ' + error.message);
        }
    }

    async updateMember(userId, updatedData) {
        const fields = [];
        const values = [];

        if (updatedData.first_name) {
            fields.push('first_name = ?');
            values.push(updatedData.first_name);
        }
        if (updatedData.last_name) {
            fields.push('last_name = ?');
            values.push(updatedData.last_name);
        }
        if (updatedData.address) {
            fields.push('address = ?');
            values.push(updatedData.address);
        }
        if (updatedData.email) {
            fields.push('email = ?');
            values.push(updatedData.email);
        }

        if (fields.length === 0) {
            throw new Error('Aucune donnée à mettre à jour');
        }

        values.push(userId);

        const query = `UPDATE member SET ${fields.join(', ')} WHERE id = ?`;

        try {
            const result = await this.dbManager.query(query, values);
            if (result.affectedRows > 0) {
                const updatedUserQuery = 'SELECT * FROM member WHERE id = ?';
                const updatedUser = await this.dbManager.query(updatedUserQuery, [userId]);
                return updatedUser[0];
            }
            throw new Error('Erreur lors de la mise à jour du membre');
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour du membre : ' + error.message);
        }
    }

    destroy() {
        this.dbManager.close();
    }
}

module.exports = new MemberModel();
