// Importaciones de Node

// Importaciones del proyecto
const db = require('../config/db.config.js');
const config = require('../config/config.js');
const ROLEs = config.ROLEs;
const User = db.user;

checkDuplicateUserNameOrEmail = (req, res, next) => {
    // -> Verifica si el usuario ya existe en la base de datos
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: 'Ocurrió un error al registrar el usuario',
                data: null,
                response: false,
                errors: {
                    message: 'El nombre de usuario ya está registrado'
                }
            });
            return;
        }

        // -> Verifica si el email ya esta registrado en la base de datos
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: 'Ocurrió un error al registrar el usuario',
                    data: null,
                    response: false,
                    errors: {
                        message: 'El correo electrónico ya está registrado'
                    }
                });
                return;
            }

            next();
        });
    });
}

// -> Verifica si los roles que se enviaron estan permitidos para su creación
checkRolesExisted = (req, res, next) => {
    for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
            res.status(400).send({
                message: 'Ocurrió un error al registrar el usuario',
                data: null,
                response: false,
                errors: {
                    message: `El rol: ${req.body.roles[i]} no existe.`
                }
            });
            return;
        }
    }
    next();
}

// -> Exporta las funciones permitidas para su uso
module.exports = {
    checkDuplicateUserNameOrEmail,
    checkRolesExisted
};