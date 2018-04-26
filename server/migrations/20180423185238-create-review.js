
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    comment: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    businessId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      refrences: {
        model: 'Businesses',
        key: 'id',
        as: 'businessId',
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable('Reviews'),
};
