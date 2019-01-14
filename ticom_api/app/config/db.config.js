// Importaciones de Node
const Sequelize = require('sequelize');

// Importaciones del proyecto
const env = require('./env.js');

// Configuración de la base de datos con las variables de entorno
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    timezone: env.timezone,

    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    },
    define: {
        charset: env.define.charset,
        dialectOptions: {
            collate: env.define.dialectOptions.collate
        },
        timestamps: env.define.timestamps
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importo los modelos
db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.role = require('../model/role.model.js')(sequelize, Sequelize);
db.token = require('../model/token.model')(sequelize, Sequelize);
db.provider = require('../model/providers.model')(sequelize, Sequelize);
db.product = require('../model/products.model')(sequelize, Sequelize);
db.container = require('../model/containers.model')(sequelize, Sequelize);
db.container_product = require('../model/container_product.model')(sequelize, Sequelize);

// Genero las relaciones entre modelos
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId' });
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId' });

db.user.hasMany(db.token, { foreignKey: 'userId', sourceKey: 'id' });
db.token.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id' });

db.user.hasMany(db.product, { foreignKey: 'userId', sourceKey: 'id' });
db.product.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id' });

db.user.hasMany(db.provider, { foreignKey: 'userId', sourceKey: 'id' });
db.provider.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id' });

db.user.hasMany(db.container, { foreignKey: 'userId', sourceKey: 'id' });
db.container.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id' });

db.provider.hasMany(db.product, { foreignKey: 'providerId', sourceKey: 'id' });
db.product.belongsTo(db.provider, { foreignKey: 'providerId', sourceKey: 'id' });

db.product.belongsToMany(db.container, { through: db.container_product });
db.container.belongsToMany(db.product, { through: db.container_product });

// Requiero los archivos que contienen los registros con los que se 
// debe levantar la base de datos. Estas variables se deben llamar 
// con su respectivo metodo init en el server.js al inicializar la 
// base de datos
db.role_seeder = require('./../seeders/rol.seeder')(db.role);

module.exports = db;