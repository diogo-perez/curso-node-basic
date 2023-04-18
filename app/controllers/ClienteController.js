var clienteModel = require('../models/clienteModel')();

module.exports.index = function (req, res) {
    clienteModel.all(function (erro, resultado) {
        res.render('site/home', { clientes: resultado, erros: {}, dados: {} });
    });
};

module.exports.store = function (req, res) {
    var dados = req.body;

    req.assert('nome', 'Preencha com um Nome').notEmpty();
    req.assert('nome', 'Nome deve ter 3 a 20 caracteres').len(3, 20);
    req.assert('email', 'Preencha com um E-mail Valido').isEmail();
    req.assert('email', 'Preencha com um E-mail').notEmpty();

    var validacaoErros = req.validationErrors();

    if (validacaoErros) {
        clienteModel.all(function (erro, resultado) {
            res.render('site/home', { clientes: resultado, erros: validacaoErros, dados: dados });
        })
        return;
    }

    clienteModel.save(dados, function (erro, resultado) {
        if (!erro) {
            res.redirect('/');
        } else {
            console.log("Erro ao cadastrar usuario");
            res.redirect('/');
        }

    });
};

module.exports.show = function (req, res) {
    clienteModel.find(req.params.id, function (erro, resultado) {
        if (resultado[0] && !erro) {
            res.render('site/detalhe', { cliente: resultado[0] });
        } else {
            console.log("Esse cliente não existe");
            res.redirect('/');
        }

    });
};