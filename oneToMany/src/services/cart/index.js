const express = require("express");
const Product = require("../../db").Product;
const Cart = require("../../db").Cart;
const Category = require("../../db").Category;
const { Sequelize } = require("sequelize");
const router = express.Router();

router.route("/").get(async (req, res, next) => {
  try {
    let cart = await Cart.findAll({
      where: { userId: req.user.id },
      include: { model: Product, include: { model: Category } },
      attributes: [
        "product.id",
        // "product.categoryId",
        [Sequelize.fn("count", Sequelize.col("productId")), "unitaryQty"],
        [Sequelize.fn("sum", Sequelize.col("product.price")), "totalPrice"],
      ],
      group: ["product.id", "product->category.id"],
    });
    const total = cart
      .map((c) => c.toJSON())
      .reduce(
        (a, b) => ({
          totalPrice: a.totalPrice + b.totalPrice,
          unitaryQty: parseFloat(a.unitaryQty) + parseFloat(b.unitaryQty),
        }),
        { totalPrice: 0, unitaryQty: 0 }
      );
    console.log(total);
    res.send({ products: cart, ...total });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router
  .route("/:productId")
  .post(async (req, res, next) => {
    try {
      const { productId } = req.params;
      const result = await Cart.create({
        productId,
        userId: req.user.id,
      });
      // const result = await req.user.addProduct(productId);
      res.send(result);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { productId } = req.params;
      await Cart.destroy({ where: { productId }, limit: 1 });
      res.send("deleted");
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
