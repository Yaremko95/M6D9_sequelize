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
    category: {
      type: DataTypes.STRING,
      required: true,
    },
    price: {
      type: DataTypes.FLOAT,
      required: true,
    },
  });
  Product.associate = (models) => {
    Product.belongsToMany(models.Cart, {
      // will automatically create 'cart_product' table
      through: models.CartItem,
    });
  };
  return Product;
};
