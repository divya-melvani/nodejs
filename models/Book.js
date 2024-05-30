const  sequelize  = require("../config/database");
const { DataTypes } = require("sequelize");
const Book = sequelize.define(
   "Book",
   {
      // Each attribute will pair with a column
      // Here we define our model attributes

      // Our primaryKey, book id, our unique identifier
      
      // This will create a title for a column of the book
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      // This will create a column for the author's name
      authorName: {
         type: DataTypes.STRING,
         // remember allowNull defaults to true
      },
      imageName: {
        type: DataTypes.STRING,
      }
   },
   {
      // For the sake of clarity we specify our indexes
      indexes: [{ unique: true, fields: ["id"] }],
   }
);

// `sequelize.define` also returns the model
console.log(Book === sequelize.models.Book); // true

module.exports = {
   Book,
   sequelize,
};