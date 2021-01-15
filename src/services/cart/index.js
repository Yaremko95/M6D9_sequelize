const express = require("express");
const Product = require("../../db").Product;
const CartItem = require("../../db").CartItem;
const Cart = require("../../db").Cart;
const User = require("../../db").User;
const { Sequelize } = require("sequelize");
const router = express.Router();

router.route("/").get(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: {
        model: Product,
        through: { attributes: [] },
      },
    });
    const cartItems = await CartItem.findOne({
      where: { cartId: cart.id },

      attributes: [[Sequelize.fn("sum", Sequelize.col("quantity")), "total"]],
    });

    res.send({
      ...cart.get({ plain: true }),
      quantity: cartItems.get({ plain: true }).total || 0,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router
  .route("/:productId")
  .post(async (req, res, next) => {
    try {
      //1. find a cert by userId
      //const cart = await req.user.getCart();
      const cart = await Cart.findOne({
        where: { userId: req.user.id },
      });
      //2. check if product already exists in the cart

      const products = await cart.getProducts({
        //returns an array
        where: { id: req.params.productId },
      });

      // const productsList = await Cart.findOne({
      //   include: { model: Product, where: { id: req.params.productId } },
      // });
      // const { products } = productsList;

      //3. if product exists then update its q-ty else find Product in products table

      if (products.length > 0) {
        let [product] = products;
        await cart.addProduct(product, {
          through: { quantity: product.cart_item.quantity + 1 },
        });
        console.log("here");
      } else {
        const product = await Product.findByPk(req.params.productId);
        await cart.addProduct(product, { through: { quantity: 1 } });
      }

      res.send(products);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      //1. find a cert by userId
      const cart = await req.user.getCart();
      //2.get a specific product in the cart
      const products = await cart.getProducts({
        //returns an array
        where: { id: req.params.productId },
      });
      let [product] = products;

      //3.check if qty is 0 then remove else decrement qty
      if (product.cart_item.quantity === 0) {
        await product.cart_item.destroy();
      } else {
        await cart.addProduct(product, {
          through: { quantity: product.cart_item.quantity - 1 },
        });
      }
      res.send(product);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
