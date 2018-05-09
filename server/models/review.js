

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Review.associate = (models) => {
    // associations can be defined here
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE',
    });
  };
  return Review;
};
