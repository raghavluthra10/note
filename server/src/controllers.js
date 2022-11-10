// controllers for todos
const getAllTodos = async (ctx) => {
   try {
      const data = await ctx.db("todo");
      console.log("data", data);

      ctx.status = 200;
      ctx.body = data;
   } catch (error) {
      ctx.status = 500;
      ctx.body = "Internal server error";
      console.log(error);
   }
};

const getTodo = async (ctx) => {
   try {
      const id = ctx.params.id;

      const data = await ctx.db("todo").where({
         id: id,
      });

      if (data.length == 0) {
         ctx.status = 404;
         ctx.body = "Todo does not exist";
         return;
      }

      ctx.status = 200;
      ctx.body = data;
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
};

const addTodo = async (ctx) => {
   try {
      const data = await JSON.parse(ctx.request.body);

      await ctx.db("todo").insert(data);

      ctx.body = data;
      ctx.status = 200;
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
};

const deleteTodo = async (ctx) => {
   try {
      const id = ctx.params.id;
      const findIfTodoExists = await ctx.db("todo").where({ id: id });

      if (findIfTodoExists.length == 0) {
         ctx.status = 404;
         ctx.body = "Todo does not exist";
         return;
      }
      await ctx.db("todo").where("id", id).del();
      ctx.body = "Deleted successfully" + " " + id;
      ctx.status = 200;
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
};

const updateTodo = async (ctx) => {
   try {
      const id = ctx.params.id;

      const findIfTodoExists = await ctx.db("todo").where({ id: id });

      if (findIfTodoExists.length == 0) {
         ctx.status = 404;
         ctx.body = "Todo does not exist";
         return;
      }

      const recievedBody = await JSON.parse(ctx.request.body);

      const title = recievedBody.title;
      const description = recievedBody.description;
      const completed = recievedBody.completed;

      const todoToBeUpdated = {};

      if (title) {
         todoToBeUpdated.title = title;
      }

      if (description) {
         todoToBeUpdated.description = description;
      }

      if (completed) {
         todoToBeUpdated.completed = true;
      } else if (completed === false) {
         todoToBeUpdated.completed = false;
      }

      await ctx.db("todo").where({ id: id }).update(todoToBeUpdated);
      ctx.status = 200;
      ctx.body = "Todo updated successfully!";
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
};

module.exports = {
   getAllTodos,
   getTodo,
   updateTodo,
   deleteTodo,
   addTodo,
};
