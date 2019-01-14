const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Container = db.container;
const User = db.user;

allContainers = (req, res, next) => {
    Container.findAll().then(container => {
        return res.status(200).json({
            message: "contenedor",
            data: container,
            response: true,
            errors: null
        })
    }).catch(err => {
        res.status(500).send({
            message: 'Ocurrió al consultar contenedores',
            data: null,
            response: false,
            errors: {
                message: err.message
            }
        });
    })
}

createContainers = (req, res, next) => {
    User.create({
        capacity: req.body.capacity,
        capacityType: req.body.capacityType,
        status: true,
        description: req.body.description,
        userId: req.userId


    }).then(container => {
        res.send({
            message: "Contenedor registrado correctamente!",
            data: container,
            response: true,
            errors: null
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Ocurrió un error al registrar el contenedor',
            data: null,
            response: false,
            errors: {
                message: err.message
            }
        });
    });
}

findContainer = (req, res, next) => {

}

module.exports = {

    allContainers,
    createContainers

}