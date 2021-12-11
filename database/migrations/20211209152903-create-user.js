module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            hashed_password: {
                type: Sequelize.BLOB,
            },
            salt: {
                type: Sequelize.BLOB,
            },
            is_email_verify: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                type: Sequelize.DATE,
            },
        });
    },

    down: async queryInterface => {
        await queryInterface.dropTable('users');
    },
};
