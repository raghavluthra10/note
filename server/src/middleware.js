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

module.exports = { authorize };
