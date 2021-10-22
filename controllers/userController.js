const fs = require("fs");
const jwt = require("jsonwebtoken");

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = id => {
  return jwt.sign({ id }, "secret key", { expiresIn: '2h' });
};

// sign in page
module.exports.signin_get = (re, res) => {
  res.render("signin");
};

//sign up page
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

// sign in users
module.exports.signin_post = (req, res) => {
  // get data from users.json if user is present redirect to homepage
  fs.readFile("./data/users.json", (err, re) => {
    if (err) {
      console.log(err);
      res.status(400).send('Problem in reading user data');
    }
    const allUsers = JSON.parse(re);
    let success;
    let id;
    allUsers.users.forEach(user => {
      if (
        user.username === req.body.username &&
        user.password === req.body.password &&
        !user.isAdmin
      ) {
        id = user._id;
        success = true;
      }
    });
    if (success) {
      const token = createToken(id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).redirect("books");
    }
    else if (req.body.username === "admin" && req.body.password === "admin") {
      const token = createToken(id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).redirect("admin");
    }
    else{
      res.status(400).send('no user found');
    }
  });
};

module.exports.signup_post = (req, res) => {
  fs.readFile("./data/users.json", (err, re) => {
    if(err){
      res.status(400).send('problem reading the users data');
    }
    const allUsers = JSON.parse(re).users;
    const newUser = req.body;
    newUser._id = Math.floor(Math.random() * 100 + 1);
    allUsers.push(newUser);
    const updatedUsers = {
      users: allUsers
    };
    fs.writeFile(
      "./data/users.json",
      JSON.stringify(updatedUsers),
      (err, r) => {
        if(err){
          res.status(400).send('problem writing into users data');
        }
        res.json(updatedUsers);
      }
    );
    res.status(201).redirect("signin");
  });
};

module.exports.signout = (re, res) => {
  res.render("signin");
};
