const Router = require("@koa/router");
const {
   getAllTodos,
   getTodo,
   updateTodo,
   deleteTodo,
   addTodo,
   getAllUsers,
   getUser,
   signupUser,
   signoutUser,
   signinUser,
} = require("./controllers");

const { authorize } = require("./middleware");

// require("dotenv").config();

// var jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const router = new Router();

router.redirect("/login", "/signin");

// user routes
router.get("/users", getAllUsers);
router.get("/user/:id", getUser);
router.post("/signup", signupUser);
router.post("/signout", signoutUser);
router.post("/signin", signinUser);

// todo routes
router.get("/todos", authorize, getAllTodos);
router.get("/todo/:id", authorize, getTodo);
router.post("/todo", authorize, addTodo);
router.delete("/todo/:id", authorize, deleteTodo);
router.put("/todo/:id", authorize, updateTodo);

module.exports = {
   router,
};
