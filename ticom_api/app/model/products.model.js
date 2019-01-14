module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('products', {
        code: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        // este es el valor en Yuanes que es el de entrada del registro
        price: {
            type: Sequelize.DECIMAL
        },
        photoURL: {
            type: Sequelize.CHAR,
            allowNull: true,
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        // este es el valor en dolares 
        price_dollars: {
            type: Sequelize.DECIMAL
        },
        //  este es el valor Bolivares  de contado sin intereses
        price_bolivars: {
            type: Sequelize.DECIMAL
        },
        // el precio en Bolivares  a plazo de 7 dias con los intereses
        price_bolivarsSeven: {
            type: Sequelize.DECIMAL
        },
        // el precio en bolivares a plazo de 15 dias con el interes
        price_bolivarsFifteen: {
            type: Sequelize.DECIMAL
        },



    });

    return Product;
}