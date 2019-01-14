module.exports = (sequelize, Sequelize) => {
    const Provider = sequelize.define('providers', {
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        telephone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        notes: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });

    return Provider;
}