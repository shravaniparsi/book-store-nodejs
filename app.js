const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const adminRoutes = require("./routes/admin");


// middleware
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// listen to the port
app.listen(3000);

// routes
app.get("/", (req, res) => {
  res.render("signin");
});
app.use(userRoutes);
app.use(bookRoutes);
app.use(adminRoutes);
