const { Sequelize, DataTypes } = require("sequelize");
const Product = require("./product");
const User = require("./user");
const Cart = require("./cart");
const Category = require("./category");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  { host: process.env.HOST, dialect: "postgres" }
);

//test connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established"))
  .catch((e) => console.log("Unable to establish connection:", e));

//includes all the Models
const models = {
  Product: Product(sequelize, DataTypes),
  User: User(sequelize, DataTypes),
  Cart: Cart(sequelize, DataTypes),
  Category: Category(sequelize, DataTypes),
};

//force Sequelize to create associations
Object.keys(models).forEach((modelName) => {
  // iterate through each model in models obj
  if ("associate" in models[modelName]) {
    // in "associate" in any of the models, bc not every model has association
    models[modelName].associate(models); // call associate function
  }
});

models.sequelize = sequelize; //to .sync()  all models at once
models.Sequelize = Sequelize; //to include all config
module.exports = models;
