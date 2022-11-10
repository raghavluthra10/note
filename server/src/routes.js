const Router = require("@koa/router");

const router = new Router();

router.redirect("/login", "/signin");

router.get("/todos", async (ctx) => {
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
});

router.get("/todo/:id", async (ctx) => {
   try {
      const id = ctx.params.id;
      const data = await ctx.db("todo").where({
         id: id,
      });
      ctx.status = 200;
      ctx.body = data;
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
});

router.post("/todo", async (ctx) => {
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
});

router.delete("/todo/:id", async (ctx) => {
   try {
      const id = ctx.params.id;
      await ctx.db("todo").where("id", id).del();
      ctx.body = "Deleted successfully" + " " + id;
      ctx.status = 200;
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
});

router.put("/todo/:id", async (ctx) => {
   try {
      const id = ctx.params.id;
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
});

module.exports = {
   router,
};
