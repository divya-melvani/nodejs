const {Book} = require("./models/Book");
const createBook = (req, res) => {
    // Call the create function on the Book model, and pass the data that you receive.
     const {title, author, image} = req.body;
    Book.create({
        title: title,
        authorName: author,
        imageName: image
    })
    .then((result) => {
        return res.json({
              message: "Record created successfully!",
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
              message: "Unable to create a record!",
        });
    });
 };

// Get Specific Product Details
// const getBook = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const product = await Book.findByPk(id);
//       if (!product) {
//         return res.json({ message: "Product not found" });
//       }
//       res.json(product);
//     } catch (error) {
//       res.json({ error: error.message });
//     }
//   };
const getBook = (req, res) => {
    const { id } = req.params;
    Book.findByPk(id)
      .then(product => {
        if (!product) {
          return res.json({ message: "Product not found" });
        }
        res.json(product);
      })
      .catch(error => {
        res.json({ error: error.message });
      });
  };


const getAllBooks1 = (req, res) => {
    Book.findAll()
      .then(books => {
        res.json(books);
      })
      .catch(error => {
        res.json({ error: error.message });
      });
  };


  const getAllBooks = (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const offset = (page - 1) * limit;
  
    Book.findAndCountAll({
      limit: limit,
      offset: offset
    })
      .then(result => {
        const books = result.rows;
        const totalItems = result.count;
        const totalPages = Math.ceil(totalItems / limit);
  
        res.json({
          books: books,
          totalItems: totalItems,
          totalPages: totalPages,
          currentPage: page
        });
      })
      .catch(error => {
        res.json({ error: error.message });
      });
  };
  
//const editBook = (req, res) => {};

const editBook = (req, res) => {
    const {id} = req.params;
    const {title, authorName} = req.body;
    Book.findByPk(id)
    .then(Book => {
        Book.update({title, authorName});
       return res.json({message:"edited su", Book})
    })
    .catch(error => {
        res.json({'error' : error.message});
    })
};

 const deleteBook = (req, res) => {
    const {id} = req.params;
    Book.findByPk(id)
    .then(Book => {
        if (!Book) {
            return res.status(404).json({ message: "Book not found" });
          }
        Book.destroy();
        return res.json({message:"deleted su", Book})
    })
    .catch(error => {
        res.json({error:error.message});
    })
 };

module.exports = { createBook, getBook, getAllBooks, editBook, deleteBook };