const db = require('../config/db.config.js');
const User = db.user;
const Role = db.role;

userContent = (req, res) => {
    User.findOne({
        where: { id: req.userId },
        attributes: ['name', 'username', 'email'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {

        delete user.dataValues.password;

        res.status(200).send({
            message: "Contenido del usuario!",
            data: user,
            response: true,
            errors: null
        });
    }).catch(err => {
        res.status(500).send({
            message: 'No tienes permiso para ver este contenido',
            data: null,
            response: false,
            errors: {
                message: err
            }
        });
    })
}

adminBoard = (req, res) => {
    User.findOne({
        where: { id: req.userId },
        attributes: ['name', 'username', 'email'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {

        delete user.dataValues.password;

        res.status(200).send({
            message: "Contenido del administrador!",
            data: user,
            response: true,
            errors: null
        });
    }).catch(err => {
        res.status(500).send({
            message: 'No tienes permiso para ver este contenido',
            data: null,
            response: false,
            errors: {
                message: err
            }
        });
    })
}

sellerBoard = (req, res) => {
    User.findOne({
        where: { id: req.userId },
        attributes: ['name', 'username', 'email'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {

        delete user.dataValues.password;

        res.status(200).send({
            message: "Contenido del vendedor!",
            data: user,
            response: true,
            errors: null
        });
    }).catch(err => {
        res.status(500).send({
            message: 'No tienes permiso para ver este contenido',
            data: null,
            response: false,
            errors: {
                message: err
            }
        });
    })
}

// -> Exporta las funciones permitidas para su uso
module.exports = {
    userContent,
    adminBoard,
    sellerBoard
};