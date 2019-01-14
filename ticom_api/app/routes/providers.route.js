// Importaciones de Node
var express = require('express');
var router = express.Router();

// Importaciones del proyecto
const verifySignUp = require('./../middlewares/verifySignUp.middleware');
const authJwt = require('./../middlewares/verifyJwtToken.middleware');

module.exports = function(app) {

    const controller = require('../controller/providers.controller');

    router.get('/providers/all', controller.allProviders);
    router.post('/providers/create', controller.createProviders);

    return router;
}