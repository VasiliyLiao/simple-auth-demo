
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Verification extends Model {
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            // define association here
        }
    }

    Verification.init(
        {
            token: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            expired_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Verification',
            tableName: 'verifications',
        },
    );

    return Verification;
};
