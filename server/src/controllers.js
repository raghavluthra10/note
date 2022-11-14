require("dotenv").config();

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// todos controllers
const getAllTodos = async (ctx) => {
   try {
      const userId = ctx.userId;

      const data = await ctx.db
         .select("todo.*")
         .from("todo")
         .leftJoin("user", "user.id", "todo.user_id")
         .where({ user_id: userId });

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
      const userId = ctx.userId;
      const data = await JSON.parse(ctx.request.body);

      const { title, description } = data;

      if (!title || !description) {
         ctx.body = "Please add Title and description";
         return;
      }

      data.user_id = userId;

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
      const todoId = ctx.params.id;
      const findIfTodoExists = await ctx.db("todo").where({ id: todoId });

      if (findIfTodoExists.length == 0) {
         ctx.status = 404;
         ctx.body = "Todo does not exist";
         return;
      }
      await ctx.db("todo").where("id", todoId).del();
      ctx.body = "Deleted successfully" + " " + todoId;
      ctx.status = 200;
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
};

const updateTodo = async (ctx) => {
   try {
      const todoId = ctx.params.id;

      const findIfTodoExists = await ctx.db("todo").where({ id: todoId });

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

      await ctx.db("todo").where({ id: todoId }).update(todoToBeUpdated);
      ctx.status = 200;
      ctx.body = "Todo updated successfully!";
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
};

// user controllers

const getAllUsers = async (ctx) => {
   try {
      const users = await ctx.db("user");

      if (!users) {
         ctx.body = "No users exist";
         ctx.status = 404;
         return;
      }

      ctx.body = users;
      ctx.status = 200;
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
};

const getUser = async (ctx) => {
   try {
      const userId = ctx.userId;

      const user = await ctx.db("user").where({ id: userId });

      delete user[0].password;

      if (!user) {
         ctx.body = "User does not exist";
         ctx.status = 404;
         return;
      }

      ctx.body = user;
      ctx.status = 200;
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
};

const signupUser = async (ctx) => {
   try {
      const data = await JSON.parse(ctx.request.body);

      const { email, password, name } = data;

      if (!(email && password && name)) {
         ctx.status = 400;
         ctx.body = "Provide all credentials";
         return;
      }

      const checkIfUserAlreadyExists = await ctx
         .db("user")
         .where({ email: email });

      if (checkIfUserAlreadyExists.length > 0) {
         ctx.body = "User already exists with this email id";
         return;
      }

      // encrypt the password
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
         bcrypt.hash(password, salt, async function (err, hash) {
            // Store hash in your password DB.
            data.password = hash;
            await ctx.db("user").insert(data);
         });
      });

      ctx.body = "User signed up!";
      ctx.status = 200;
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
};

const signoutUser = async (ctx) => {
   try {
      const authToken = ctx.cookies.get("auth-token");

      if (!authToken) {
         ctx.body = "user is already signed out";
         return;
      }

      ctx.cookies.set("auth-token", null);
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
};

const signinUser = async (ctx) => {
   try {
      const credentialsFromClient = await JSON.parse(ctx.request.body);
      const { email, password } = credentialsFromClient;

      // see if all credentials have been provided

      if (!(email && password)) {
         ctx.status = 400;
         ctx.body = "Provide all credentials";
         return;
      }

      // find if user exists;
      const user = await ctx.db("user").where({ email: email });

      if (!user) {
         ctx.body = "User does not exists!";
         ctx.status = 404;
         return;
      }

      // see if password is right
      const checkIfPasswordIsCorrect = bcrypt.compareSync(
         password,
         user[0].password
      );

      if (checkIfPasswordIsCorrect == false) {
         ctx.body = "Wrong credentials";
         ctx.status = 401;
         return;
      }

      const { name, id } = user[0];

      // send jwt as cookie
      const secretKey = process.env.jwtSecretKey;

      const payload = {
         name: name,
         userId: id,
      };

      console.log("paylaod", payload);

      const token = jwt.sign(payload, secretKey);

      ctx.cookies.set("auth-token", token);

      ctx.body = "User signed in successfully!";
      ctx.status = 200;
   } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "Internal server error";
   }
};

module.exports = {
   // todos controllers
   getAllTodos,
   getTodo,
   updateTodo,
   deleteTodo,
   addTodo,

   // user controllers
   getAllUsers,
   getUser,
   signupUser,
   signoutUser,
   signinUser,
};
