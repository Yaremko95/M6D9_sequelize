module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
    },

    price: {
      type: DataTypes.FLOAT,
      required: true,
    },
  });
  Product.associate = (models) => {
    Product.belongsTo(models.Category);
    Product.hasMany(models.Cart);
    Product.belongsToMany(models.User, {
      through: { model: models.Cart, unique: false },
      timestamps: false,
    });
  };
  return Product;
};
