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
  // checkIfUserIsLoggedIn,
} = require("./controllers");

const {
  authorize,
  // authenticate
} = require("./middleware");

const router = new Router();

router.redirect("/login", "/signin");

// user routes
router.post("/signup", signupUser);
router.post("/signout", signoutUser);
router.post("/signin", signinUser);
router.get("/users", authorize, getAllUsers);
router.get("/user", authorize, getUser);

// todo routes
router.get("/todos", authorize, getAllTodos);
// router.get("/todos", getAllTodos);
router.get("/todo/:id", authorize, getTodo);
router.post("/todo", authorize, addTodo);
router.delete("/todo/:id", authorize, deleteTodo);
router.put("/todo/:id", authorize, updateTodo);

// check if user is logged in
// router.get("/isLoggedIn", authenticate, checkIfUserIsLoggedIn);

module.exports = {
  router,
};
