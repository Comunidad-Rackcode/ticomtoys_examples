const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;
const Token = db.token;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

signup = (req, res) => {
    User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        Role.findAll({
            where: {
                name: {
                    [Op.or]: req.body.roles
                }
            }
        }).then(roles => {
            user.setRoles(roles).then((resultRoles) => {

                user.dataValues.roles = roles;

                delete user.dataValues.password;

                res.send({
                    message: "Usuario registrado correctamente!",
                    data: user,
                    response: true,
                    errors: null
                });
            });
        }).catch(err => {
            res.status(500).send({
                message: 'Ocurrió un error al registrarse',
                data: null,
                response: false,
                errors: {
                    message: err.message
                }
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Ocurrió un error al registrarse',
            data: null,
            response: false,
            errors: {
                message: err.message
            }
        });
    })
}

signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: 'Ocurrió un error al autenticarse',
                data: null,
                response: false,
                errors: {
                    message: 'El usuario o contraseña son incorrectos'
                }
            });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                message: 'Ocurrió un error al autenticarse',
                data: null,
                response: false,
                errors: {
                    message: 'El usuario o contraseña son incorrectos'
                }
            });
        }

        var token = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: config.tokenLife // expira en 1 hora
        });

        var refreshToken = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: config.refreshTokenLife // expira en 48 horas
        });

        Token.create({
            deviceInfo: req.body.deviceInfo,
            ipAddress: req.body.ipAddress,
            accessToken: token,
            refreshToken: refreshToken,
            userId: user.id
        }).then(() => {

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push('ROLE_' + roles[i].name.toUpperCase());
                }
                return res.status(200).send({
                    re: "Usuario autenticado correctamente!",
                    data: {
                        accessToken: token,
                        refreshToken: refreshToken,
                        username: user.username,
                        authorities: authorities
                    },
                    response: true,
                    errors: null
                });
            })

        }).catch(err => {
            return res.status(500).send({
                message: 'Ocurrió un error al autenticarse',
                data: null,
                response: false,
                errors: {
                    message: err.message
                }
            });
        });

    }).catch(err => {
        return res.status(500).send({
            message: 'Ocurrió un error al autenticarse',
            data: null,
            response: false,
            errors: {
                message: err.message
            }
        });
    });
}

refreshtoken = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: 'Ocurrió un error al autenticarse',
                data: null,
                response: false,
                errors: {
                    message: 'El token no es válido'
                }
            });
        }

        var token = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: config.tokenLife // expira en 1 hora
        });

        var refreshToken = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: config.refreshTokenLife // expira en 48 horas
        });

        Token.update({
            accessToken: token,
            refreshToken: refreshToken,
        }, {
            where: {
                id: req.refreshTokenId
            }
        }).then(() => {

            return res.status(200).send({
                message: "Usuario autenticado correctamente!",
                data: {
                    accessToken: token,
                    refreshToken: refreshToken,
                },
                response: true,
                errors: null
            });

        }).catch(err => {
            return res.status(500).send({
                message: 'Ocurrió un error al autenticarse',
                data: null,
                response: false,
                errors: {
                    message: err.message
                }
            });
        });

    }).catch(err => {
        return res.status(500).send({
            message: 'Ocurrió un error al autenticarse',
            data: null,
            response: false,
            errors: {
                message: err.message
            }
        });
    });
}

// -> Exporta las funciones permitidas para su uso
module.exports = {
    signup,
    signin,
    refreshtoken
};