const Router = require("@koa/router");
const {
   getAllTodos,
   getTodo,
   updateTodo,
   deleteTodo,
   addTodo,
} = require("./controllers");

const router = new Router();

router.redirect("/login", "/signin");
router.get("/todos", getAllTodos);
router.get("/todo/:id", getTodo);
router.post("/todo", addTodo);
router.delete("/todo/:id", deleteTodo);
router.put("/todo/:id", updateTodo);

module.exports = {
   router,
};
