//npm install express-session express path ejs body-parser fs sharp
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const DbManager = require('./config/dbManager');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 8080;

/*Encodage de l'url*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use((req, res, next) => {
    res.locals.logUser = req.session.logUser;
    res.locals.cart = req.session.cart || [];
    next();
});

// Configuration de la base de données
const dbManager = new DbManager();
dbManager.connect();
console.log(`Connecté à la base de données MySQL`);

// Autres configurations et middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/static', express.static(path.join(__dirname, 'static'), { 'Content-Type': 'text/css' }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Serveur marche sur le port ${port} avec Express server : http://localhost:${port}`);
});
