const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "secret key", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/signin");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/signin");
  }
};

const destroyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    res.clearCookie('jwt')
  }
  next();
};
module.exports = { requireAuth, destroyToken };
