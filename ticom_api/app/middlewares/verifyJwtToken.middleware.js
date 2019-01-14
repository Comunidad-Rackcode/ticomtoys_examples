// Importaciones de Node
const jwt = require('jsonwebtoken');

// Importaciones del proyecto
const config = require('../config/config.js');
const db = require('../config/db.config.js');
const User = db.user;
const Token = db.token;

// -> Verifica que se haya enviado el token y que sea valido.
// -> Si es valido agrega a la petición el userId para cualquier
// -> operación que se vaya a realizar con este
verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({
            message: 'Ocurrió un error al autenticarse',
            data: null,
            response: false,
            errors: {
                message: 'El token de seguridad no fue enviado'
            }
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {

            let errors = {
                message: err
            };

            let code = 500;

            if (err.name == 'TokenExpiredError') {
                errors.refreshToken = true;
                code = 401;
            }

            return res.status(code).send({
                message: 'Ocurrió un error al autenticarse',
                data: null,
                response: false,
                errors: errors
            });

        } else {

            req.userId = decoded.id;

            console.log('Voy a consular el token');

            Token.findOne({
                where: {
                    userId: req.userId,
                    accessToken: token,
                    status: 1
                }
            }).then((token) => {

                if (!token) {
                    return res.status(500).send({
                        message: 'Ocurrió un error al autenticarse',
                        data: null,
                        response: false,
                        errors: {
                            message: 'El token no es válido.'
                        }
                    });
                }

                next();

            }).catch(err => {
                return res.status(500).send({
                    message: 'Ocurrió un error al autenticarse',
                    data: null,
                    response: false,
                    errors: {
                        message: 'El token no es válido.'
                    }
                });
            });
        }
    });
}

verifyRefreshToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({
            message: 'Ocurrió un error al autenticarse',
            data: null,
            response: false,
            errors: {
                message: 'El token de seguridad no fue enviado'
            }
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                message: 'Ocurrió un error al autenticarse',
                data: null,
                response: false,
                errors: {
                    message: err
                }
            });
        } else {

            req.userId = decoded.id;

            Token.findOne({
                where: {
                    userId: req.userId,
                    refreshToken: token,
                    status: 1
                }
            }).then((refreshTokenFound) => {

                if (!token) {
                    return res.status(500).send({
                        message: 'Ocurrió un error al autenticarse',
                        data: null,
                        response: false,
                        errors: {
                            message: 'El token no es válido.'
                        }
                    });
                }

                req.refreshTokenId = refreshTokenFound.id;

                next();

            }).catch(err => {
                return res.status(500).send({
                    message: 'Ocurrió un error al autenticarse',
                    data: null,
                    response: false,
                    errors: {
                        message: 'El token no es válido.'
                    }
                });
            });
        }
    });
}

// -> Despues de verificar el token, verifico
// -> con el userId de la request que tenga asigando el rol de ADMIN
// -> De no ser así, devuelve un error 403
isAdmin = (req, res, next) => {
    User.findById(req.userId)
        .then(user => {
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    console.log(roles[i].name);
                    if (roles[i].name.toUpperCase() === "ADMIN") {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: 'Ocurrió un error de permisos',
                    data: null,
                    response: false,
                    errors: {
                        message: 'No tienes permisos para acceder a esta funcionalidad. Por favor, comuníquese con el administrador del sistema para resolver este problema.'
                    }
                });
                return;
            })
        })
}

// -> Despues de verificar el token, verifico
// -> con el userId de la request que tenga asigando el rol de SELLER o ADMIN
// -> De no ser así, devuelve un error 403
isSellerOrAdmin = (req, res, next) => {
    User.findById(req.userId)
        .then(user => {
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name.toUpperCase() === "SELLER") {
                        next();
                        return;
                    }

                    if (roles[i].name.toUpperCase() === "ADMIN") {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: 'Ocurrió un error de permisos',
                    data: null,
                    response: false,
                    errors: {
                        message: 'No tienes permisos para acceder a esta funcionalidad. Por favor, comuníquese con el administrador del sistema para resolver este problema.'
                    }
                });
            })
        })
}

// -> Exporta las funciones permitidas para su uso
module.exports = {
    verifyToken,
    verifyRefreshToken,
    isAdmin,
    isSellerOrAdmin
};