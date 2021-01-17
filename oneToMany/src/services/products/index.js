const express = require("express");
const Product = require("../../db").Product;
const Category = require("../../db").Category;
const router = express.Router();
const { Op } = require("sequelize");
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const products = await Product.findAll({
        include: {
          model: Category,
          where: req.query.category
            ? {
                name: { [Op.like]: req.query.category },
              }
            : {},
        },
        where: req.query.name
          ? {
              name: { [Op.iLike]: "%" + req.query.name + "%" },
            }
          : {},
        offset: parseInt(req.query.offset | 0),
        limit: parseInt(req.query.limit | 10),
      });
      res.send(products);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newProduct = await Product.create(req.body);
      res.send(newProduct);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.send(product);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedProduct = await Product.update(req.body, {
        where: { id: req.params.id },
        returning: true, //to return updated obj
        plain: true,
      });
      res.send(updatedProduct[1]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await Product.destroy({ where: { id: req.params.id } }).then(
        (rowsDeleted) => {
          if (rowsDeleted === 1) res.send("Deleted");
        }
      );
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
