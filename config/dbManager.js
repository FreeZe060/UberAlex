const mysql = require('mysql');

class DbManager {
    constructor() {
        this.dbConfig = {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'uberalex'
        };
        this.connection = mysql.createConnection(this.dbConfig);
    }

    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error('Erreur de connexion à la base de données : ' + err.message);
            } else {
                console.log(`Connecté à la base de données MySQL`);
            }
        });
    }

    close() {
        this.connection.end();
        console.log('Connexion à la base de données fermée');
    }

    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = DbManager;
