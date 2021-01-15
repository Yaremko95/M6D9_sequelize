module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "cart_item",
    {
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    { timestamps: false }
  );

  return CartItem;
};
