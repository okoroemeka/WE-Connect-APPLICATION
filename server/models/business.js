

module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    businessname: {
      type: DataTypes.STRING,
    },
    businessaddress: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phonenumber: {
      type: DataTypes.INTEGER,
    },
    website: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
  });
  Business.associate = (models) => {
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  Business.associate = (models) => {
    Business.hasMany(models.Review, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE',
    });
  };
  return Business;
};
