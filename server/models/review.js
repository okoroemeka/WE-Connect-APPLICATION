

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    comment: {
      type: DataTypes.STRING,
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  Review.associate = (models) => {
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE',
    });
  };
  return Review;
};
