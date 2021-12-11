const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');
const {
    NODE_ENV,
} = require('../getEnv');
const dbConfig = require('../config/db');
const envDbConfig = dbConfig[NODE_ENV];
let sequelize = null;
if (['mysql', 'mariadb', 'postgres', 'mssql'].includes(envDbConfig.dialect)) {
    sequelize = new Sequelize(envDbConfig.database, envDbConfig.username, envDbConfig.password, envDbConfig);
}
else {
    sequelize = new Sequelize(envDbConfig);
}

const db = {};

fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
