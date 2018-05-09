

module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    company: DataTypes.STRING,
    address: DataTypes.STRING,
    state: DataTypes.STRING,
    telephone: DataTypes.STRING,
    website: DataTypes.STRING,
    location: DataTypes.STRING,
    category: DataTypes.STRING,
  });
  Business.associate = (models) => {
    // associations can be defined here
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  Business.associate = (models) => {
    Business.hasMany(models.Review, {
      foreignKey: 'businessId',
      as: 'reviews',
    });
  };
  return Business;
};
