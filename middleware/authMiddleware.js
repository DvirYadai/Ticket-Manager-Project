require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../modules/user-schema");

// check current user
const checkUser = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { checkUser };
