const db = require('../config/db.config.js');
const config = require('../config/config.js');

const Provider = db.provider;
const User = db.user;

allProviders = (req, res, next) => {

    Provider.FindAll().then(provider => {
        return res.status(200).json({
            message: "Proveedores",
            data: provider,
            response: true,
            errors: null
        })
    }).catch(err => {
        res.status(500).send({
            message: 'Ocurrió un error al consultar proveedores',
            data: null,
            response: false,
            errors: {
                message: err.message
            }
        });
    })
}

providersWithProducts = (req, res, next) => {

}

createProviders = (req, res, next) => {
    User.create({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        telephone: req.body.telephone,
        email: req.body.email,
        notes: req.body.notes,
        userId: req.userId
    }).then(provider => {
        res.send({
            message: "Proveedor registrado correctamente!",
            data: provider,
            response: true,
            errors: null
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Ocurrió un error al registrar el provedor',
            data: null,
            response: false,
            errors: {
                message: err.message
            }
        });
    });
}

findProvider = (req, res, next) => {

}

module.exports = {
    allProviders,
    createProviders
    
}
