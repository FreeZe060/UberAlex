const postgres = require('postgres');

class DbManager {
    constructor() {
        const connectionString = "postgresql://postgres.bnsfpvcvlqmarkfksyfz:Alex110804470%27@aws-0-eu-central-1.pooler.supabase.com:6543/postgres";
        this.sql = postgres(connectionString, {
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        });
    }

    async connect() {
        try {
            await this.sql`SELECT 1`;
            console.log('Connecté à la base de données PostgreSQL Supabase');
        } catch (err) {
            console.error('Erreur de connexion à la base de données : ' + err.message);
        }
    }

    async close() {
        await this.sql.end();
    }

    async query(queryText, values) {
        if (values && values.length > 0) {
            return await this.sql.unsafe(queryText, values);
        } else {
            return await this.sql.unsafe(queryText);
        }
    }
}

module.exports = DbManager;
