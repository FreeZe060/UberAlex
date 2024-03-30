const mysql = require('mysql');

class DbManager {
    constructor(dbConfig) {
        this.dbConfig = dbConfig;
        this.connection = mysql.createConnection(dbConfig);
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

}

module.exports = DbManager;