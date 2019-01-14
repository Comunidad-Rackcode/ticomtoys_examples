module.exports = (sequelize, Sequelize) => {
    const Container_Product = sequelize.define('container_product', {
        quantity: {
            type: Sequelize.INTEGER
        },
        // precio en yuanes de cada unoo de los productos que van en el contenedor
        price: {
            type: Sequelize.DECIMAL
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }

    });

    return Container_Product;
}