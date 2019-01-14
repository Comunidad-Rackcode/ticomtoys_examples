// Importaciones de Node
var express = require('express');
var router = express.Router();

// Importaciones del proyecto
const verifySignUp = require('./../middlewares/verifySignUp.middleware');
const authJwt = require('./../middlewares/verifyJwtToken.middleware');

module.exports = function(app) {

    const controller = require('../controller/auth.controller.js');

    router.post('/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
    router.post('/auth/signin', controller.signin);
    router.get('/auth/refreshtoken', [authJwt.verifyRefreshToken], controller.refreshtoken);

    return router;
}