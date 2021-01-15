module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });
  Cart.associate = (models) => {
    Cart.belongsToMany(models.Product, {
      // will automatically create 'cart_product' table
      through: models.CartItem,
    });
  };
  return Cart;
};
