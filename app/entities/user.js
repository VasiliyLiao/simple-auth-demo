
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            // define association here
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            hashed_password: {
                type: DataTypes.BLOB,
            },
            salt: {
                type: DataTypes.BLOB,
            },
            is_email_verify: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
        },
    );

    return User;
};
