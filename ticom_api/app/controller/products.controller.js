const db = require('../config/db.config.js');
const config = require('../config/config.js');
const path = require('path');
const fs = require('fs');

const product = db.product;
const User = db.user;

allProducts = (req, res, next) => {
    product.FindAll().then(product => {
        return res.status(200).json({
            message: "product",
            data: product,
            response: true,
            errors: null
        })
    }).catch(err => {
        res.status(500).send({
            message: 'Ocurrió un error al consultar productos',
            data: null,
            response: false,
            errors: {
                message: err.message
            }
        });
    })
}

createProducts = (req, res, next) => {
    User.create({
        code: req.body.code,
        description: req.body.description,
        // precio de entrada Yuanes
        price: req.body.price,
        userId: req.userId,


    }).then(product => {
        res.send({
            message: "Producto registrado correctamente!",
            data: product,
            response: true,
            errors: null
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Ocurrió un error al registrar el producto',
            data: null,
            response: false,
            errors: {
                message: err.message
            }
        });
    });
}

createImageProduct = (req, res, next) => {
    
    let id = req.params.id;

    if (!req.files) {
        res.status(400).json({
            message: "no ha seleccionado nada",
            data: null,
            response: false,
            errors: {
                message: message
            }
        });
    }

    // obtenerel nombre del archivo
    let file = req.files.image;
    let extend = file.name.split('.');
    let entendFile = extend[extend.length - 1];

    // validar el tipo de imagen
    let validate = ['png', 'jpg', 'gif', 'jpeg'];
    if (validate.indexOf(validate) < 0) {
        return res.status(400).json({
            message: "extension no validad",
            data: null,
            response: false,
            errors: {
                message: "las extensiones validas son " + validate.join(', ')
            }
        });
    }

    // nombre del archivo
    let filename = `${id}-${new Date().getMilliseconds()}.${extend}`;

    // mover el archivos
    let path = `./uploads/${filename}`;

    file.mv(path, err => {
        if (err) {
            return res.status(500).json({
                message: "error al mover el archivo",
                data: null,
                response: false,
                errors: {
                    message: message,
                    err: err
                }
            });
        }
        uploadImage(id, filename, res);
    })


}

findProduct = (req, res, next) => {

    product.findById(req.productID)
}



function uploadImage(id, filename, res) {

    product.findById(id).then(product => {

        // validacion si existe el producto
        if (!product) {
            return res.status(500).json({
                message: "el producto no existe",
                data: null,
                response: false,
                errors: {
                    message: message,
                    err: err
                }
            });
        }

        let oldPath = './uploads' + product.photoURL
        
        // borra si hay un archivo ya existente
        if (fs.existsSync(oldPath)) {
            fs.unlink(oldPath);
        }

        product.update({
            photoURL: filename
        },{
            where: {
                id: req.productId
            }    
            }).then(product => {
            return res.status(200).json({
                message: "Imagen actualizada",
                data: product,
                response: true,
                errors: null
            })
        }).catch(err => {
            return res.status(500).json({
                message: "el producto no existe",
                data: null,
                response: false,
                errors: {
                    message: message,
                    err: err
                }
            });
        })

    }).catch(err => {
        return res.status(500).json({
            message: "el producto no existe",
            data: null,
            response: false,
            errors: {
                message: message,
                err: err
            }
        });
    })
    
};

module.exports = {

    
}
