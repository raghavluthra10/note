require("dotenv").config();
const jwt = require("jsonwebtoken");

const authorize = async (ctx, next) => {
  try {
    const token = ctx.cookies.get("auth-token");

    if (!token) {
      ctx.body = "Please Login/SignUp";
      return;
    }

    const decoded = jwt.verify(token, process.env.jwtSecretKey);

    ctx.userId = decoded.userId;

    return next();
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = "Internal server error";
  }
};

const authenticate = async (ctx, next) => {
  try {
    const token = ctx.cookies.get("auth-token");
    console.log("token fromd huidewniue middleware =>", token);
    if (!token) {
      console.log("token is nullllll");
      ctx.userId = null;

      // return next();
    }

    // if token is null, dont decode and send back null
    const decoded = jwt.verify(token, process.env.jwtSecretKey);

    if (!decoded) {
      ctx.userId = null;
      // return next();
    }

    console.log("decoded", decoded);

    ctx.userId = decoded.userId;

    return next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Internal server error";
  }
};

module.exports = {
  authorize,
  authenticate,
};
