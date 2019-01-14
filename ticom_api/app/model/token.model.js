module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define('tokens', {
        deviceInfo: {
            type: Sequelize.STRING
        },
        ipAddress: {
            type: Sequelize.STRING
        },
        accessToken: {
            type: Sequelize.TEXT
        },
        refreshToken: {
            type: Sequelize.TEXT
        },
        dateToken: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });

    return Token;
}