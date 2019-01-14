module.exports = (sequelize, Sequelize) => {
    const Container = sequelize.define('containers', {
        capacity: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        capacityType: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        description: {
            type: Sequelize.TEXT
        }
        


    });

    return Container;
}