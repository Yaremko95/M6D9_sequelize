module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
    },
    firstName: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Cart);
    User.belongsToMany(models.Product, {
      through: { model: models.Cart, unique: false },
      timestamps: false,
    });
  };
  return User;
};
