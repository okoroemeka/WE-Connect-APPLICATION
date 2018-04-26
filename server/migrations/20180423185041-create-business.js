

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Businesses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    businessname: {
      type: Sequelize.STRING,
    },
    businessaddress: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phonenumber: {
      type: Sequelize.INTEGER,
    },
    website: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    location: {
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
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      refrences: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable('Businesses'),
};
