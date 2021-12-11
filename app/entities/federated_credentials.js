
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class FederatedCredential extends Model {
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            // define association here
        }
    }

    FederatedCredential.init(
        {
            provider: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            subject: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'FederatedCredential',
            tableName: 'federated_credentials',
        },
    );

    return FederatedCredential;
};
