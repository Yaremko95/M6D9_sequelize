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
        "product.categoryId",
        [Sequelize.fn("count", Sequelize.col("productId")), "unitaryQty"],
        [Sequelize.fn("sum", Sequelize.col("product.price")), "totalPrice"],
      ],
      group: ["product.id", "product->category.id"],
    });

    const qty = await Cart.count();
    /** OR
      const qty = await Cart.findAll({
      raw: true,
      attributes: [[Sequelize.fn("count", Sequelize.col("id")), "qty"]],
    }); */

    /** WIL  NOT WORK !!
     * SELECT SUM(p.price) FROM carts  c LEFT JOIN products p on c."productId"=p.id
     *
    const total = await Cart.findAll({
      include: { model: Product, attributes: [] },
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("product.price")), "total"],
      ],
    }); */
    const total = await Cart.sum("product.price", {
      include: { model: Product, attributes: [] },
    });
    res.send({ products: cart, qty, total });
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
