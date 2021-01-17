const express = require("express");
const cors = require("cors");
const models = require("./db");
const productRouter = require("./services/products");
const cartRouter = require("./services/cart");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    const user = await models.User.findByPk(1);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
});

app.use("/products", productRouter);
app.use("/cart", cartRouter);
models.sequelize
  .sync({ force: false }) //{force:true} to drop all tables before creating
  .then((result) => models.User.findByPk(1))
  .then(async (user) => {
    if (!user) {
      const user = await models.User.create({
        firstName: "Tetiana",
        lastName: "Yaremko",
        email: "tetianayaremko@gmail.com",
      });
    }

    return user;
  })

  .then((user) => {
    app.listen(process.env.PORT || 3002, () =>
      console.log("Running on port " + process.env.PORT)
    );
  })
  .catch((e) => console.log(e));
