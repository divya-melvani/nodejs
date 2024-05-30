/**
 * Import Sequelize.
 */
const Sequelize = require("sequelize");

/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
// const sequelize = new Sequelize("sequelizedemo", "root", "deep70", {
//    host: "127.0.0.1",
//    dialect: "mysql",
// });

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
  });
/**
 * Export the Sequelize instance. This instance can now be
 * used in the index.js file to authenticate and establish a database connection.
 */
module.exports = sequelize;
