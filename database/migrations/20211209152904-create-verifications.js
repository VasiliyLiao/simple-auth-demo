module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('verifications', {
            token: {
                type: Sequelize.STRING,
                allowNull: false,
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
                unique: true,
            },
            expired_at: {
                allowNull: false,
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('verifications');
    },
};
