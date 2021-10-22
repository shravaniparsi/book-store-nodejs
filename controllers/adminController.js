const fs = require("fs");

// get books
module.exports.admin_get = (req, res) => {
  // get books from the books.json file and render
  fs.readFile("./data/books.json", (err, re) => {
    if (err) {
      console.log(err);
        res.status(400).send('Problem reading books data');
    }
    const data = JSON.parse(re);
    res.render("admin", { books: data.books });
  });
};
// request books
module.exports.delete_post = (req, res) => {
  fs.readFile("./data/books.json", (err, re) => {
    if(err){
      res.status(400).send('Problem reading books data');
    }
    const books = JSON.parse(re).books;
    var foundIndex = books.findIndex(x => x._id == req.body.id);
    books.splice(foundIndex, 1);
    const updatedBooks = {
      books: books
    };
    fs.writeFile(
      "./data/books.json",
      JSON.stringify(updatedBooks),
      (err, r) => {
        if(err){
          res.status(400).send('Problem updating books data');
        }
        res.json(updatedBooks);
      }
    );
  });
};

module.exports.addBook_get = (req, res) => {
  res.render("addBook");
};

module.exports.addBook_post = (req, res) => {
  fs.readFile("./data/books.json", (err, re) => {
    if(err){
      res.status(400).send('Problem reading books data');
    }
    const allBooks = JSON.parse(re).books;
    const newBook = req.body;
    newBook._id = Math.floor(Math.random() * 100 + 1);
    allBooks.push(newBook);
    const updatedBooks = {
      books: allBooks
    };
    fs.writeFile(
      "./data/books.json",
      JSON.stringify(updatedBooks),
      (err, r) => {
        if(err){
          res.status(400).send('Problem updating books data');
        }
        res.json(updatedBooks);
      }
    );
    res.redirect("admin");
  });
};
