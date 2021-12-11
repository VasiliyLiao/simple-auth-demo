module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('federated_credentials', {
            provider: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            subject: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
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
        await queryInterface.dropTable('federated_credentials');
    },
};
