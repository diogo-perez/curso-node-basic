module.exports = function () {
    var express = require('express');
    var bodyParser = require('body-parser');
    const expressValidator = require('express-validator')
    var app = express();

    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(expressValidator())

    var rotas = require('../app/routes/web');
    rotas(app);

    app.listen(8000, function () {
        console.log("localhost:8000")
    });

};