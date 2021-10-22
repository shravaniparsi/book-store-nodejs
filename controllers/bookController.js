const fs = require("fs");
// const bodyParser = require("body-parser");

// To parse request body
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );
// app.use(bodyParser.json());

// get books
module.exports.book_get = (req, res) => {
  // get books from the books.json file and render
  fs.readFile("./data/books.json", (err, re) => {
    if (err) {
      console.log(err);
      res.status(400).send('Problem reading books data');
    }
    const data = JSON.parse(re);
    res.render("Books", { books: data.books });
  });
};
// request books
module.exports.book_post = (req, res) => {
  // add book to books.json file and send back updated books res
  fs.readFile("./data/books.json", (err, re) => {
    if(err){
      res.status(400).send('Problem reading books data');
    }
    const books = JSON.parse(re).books;
    var foundIndex = books.findIndex(x => x._id == req.body.id);
    books[foundIndex].count = books[foundIndex].count - 1;
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
