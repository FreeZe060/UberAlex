//npm install express-session express path ejs body-parser
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const DbManager = require('./config/dbManager');
const routes = require('./routes');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Configuration de la base de données
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'uberalex'
};

const dbManager = new DbManager(dbConfig);
dbManager.connect();

// Autres configurations et middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port} with Express server : http://localhost:${port}`);
});
