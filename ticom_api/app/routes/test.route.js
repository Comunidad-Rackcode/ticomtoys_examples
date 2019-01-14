// Importaciones de Node
var express = require('express');
var router = express.Router();

// Importaciones del proyecto
const verifySignUp = require('./../middlewares/verifySignUp.middleware');
const authJwt = require('./../middlewares/verifyJwtToken.middleware');

module.exports = function(app) {

    const controller = require('../controller/test.controller.js');

    router.get('/test/user', [authJwt.verifyToken], controller.userContent);
    router.get('/test/seller', [authJwt.verifyToken, authJwt.isSellerOrAdmin], controller.sellerBoard);
    router.get('/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

    return router;
}