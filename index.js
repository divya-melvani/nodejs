require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./config/database");
//const {Book} = require("./models/Book");
const authRoutes = require("./routes");
// app.get("/", (req, res) => {
//    res.send("Hello World!");
// });

// app.listen(port, () => {
//    console.log(`Example app listening on port ${port}`);
// });
const initApp = async () => {
    console.log("Testing the database connection..");
 
    // Test the connection.
    // You can use the .authenticate() function to test if the connection works.
 
    try {
       await db.authenticate();
       console.log("Connection has been established successfully.");
 
       // Syncronize the Book model.
       app.use(express.json());
       // Start the web server on the specified port.
       app.listen(process.env.port, () => {
          console.log(`Server is running at: http://localhost:${process.env.port}`);
       });
       app.use("/book", authRoutes);
       app.use("/auth", authRoutes);
       app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send("Something broke!");
      });
       

    } catch (error) {
       console.error("Unable to connect to the database:", error.original);
    }
 };
 
 // Initialize the application.
 initApp();

// db
//   .sync()
//   .then(() => {
//     app.listen(port, () => console.log(`Server running on port ${port}`));
//     BookModel.sync({ alter: true });
//   })
//   .catch((err) => console.error("Error syncing database:", err));