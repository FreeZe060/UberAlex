const DbManager = require('../config/dbManager');

class MemberModel {
    constructor() {
        this.dbManager = new DbManager();
        this.dbManager.connect();
    }

    // Méthode helper pour convertir la balance en nombre
    fixMember(member) {
        if (member && member.balance !== undefined) {
            member.balance = parseFloat(member.balance);
        }
        return member;
    }

    async createMember(userData) {
        try {
            const query = `
                INSERT INTO member (first_name, last_name, password, email, address)
                VALUES ($1, $2, $3, $4, $5) RETURNING *
            `;
            const result = await this.dbManager.query(query, [
                userData.first_name,
                userData.last_name,
                userData.password,
                userData.email,
                userData.address
            ]);
            return this.fixMember(result[0]);
        } catch (error) {
            throw new Error('Erreur lors de la création du membre : ' + error.message);
        }
    }

    async updateUserBalance(userId, newBalance) {
        try {
            const query = 'UPDATE member SET balance = $1 WHERE id = $2 RETURNING *';
            const result = await this.dbManager.query(query, [newBalance, userId]);
            return this.fixMember(result[0]);
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour du solde de l\'utilisateur : ' + error.message);
        }
    }

    async searchUserByEmail(email) {
        try {
            const query = 'SELECT * FROM member WHERE email = $1';
            const result = await this.dbManager.query(query, [email]);
            return result.length > 0 ? this.fixMember(result[0]) : false;
        } catch (error) {
            throw new Error('Erreur lors de la vérification de l\'existence de l\'utilisateur : ' + error.message);
        }
    }

    async authenticate(userData) {
        try {
            const query = 'SELECT * FROM member WHERE email = $1 AND password = $2';
            const result = await this.dbManager.query(query, [userData.email, userData.password]);
            return result.length > 0 ? this.fixMember(result[0]) : null;
        } catch (error) {
            throw new Error('Erreur lors de l\'authentification du membre : ' + error.message);
        }
    }

    async updateMember(userId, updatedData) {
        const fields = [];
        const values = [];
        let index = 1;

        if (updatedData.first_name) {
            fields.push(`first_name = $${index++}`);
            values.push(updatedData.first_name);
        }
        if (updatedData.last_name) {
            fields.push(`last_name = $${index++}`);
            values.push(updatedData.last_name);
        }
        if (updatedData.address) {
            fields.push(`address = $${index++}`);
            values.push(updatedData.address);
        }
        if (updatedData.email) {
            fields.push(`email = $${index++}`);
            values.push(updatedData.email);
        }

        if (fields.length === 0) {
            throw new Error('Aucune donnée à mettre à jour');
        }

        values.push(userId);
        const query = `UPDATE member SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;

        try {
            const result = await this.dbManager.query(query, values);
            if (result && result.length > 0) {
                return this.fixMember(result[0]);
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
