require("dotenv").config();

const jwt = require("jsonwebtoken");
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

    // const data = await ctx.db("todo").where({ user_id: userId });
    // console.log("temp", temp);
    console.log("data", data);

    ctx.status = 200;
    ctx.body = data;
    // ctx.body = temp;
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
    const data = await JSON.parse(ctx.request.body.data);

    const userId = ctx.userId;

    console.log("id", userId);
    const { title, description } = data;
    console.log("credentials ", title, description);
    if (!title) {
      ctx.body = "Please add Title ";
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
    const userId = ctx.userId;
    console.log("todoId", todoId);
    const findIfTodoExists = await ctx.db("todo").where({ id: todoId });
    console.log(findIfTodoExists);
    if (findIfTodoExists.length == 0) {
      ctx.status = 404;
      ctx.body = "Todo does not exist";
      return;
    }
    await ctx.db("todo").where("id", todoId).del();

    const data = await ctx.db
      .select("todo.*")
      .from("todo")
      .leftJoin("user", "user.id", "todo.user_id")
      .where({ user_id: userId });

    ctx.body = data;
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = "Internal server error";
  }
};

const updateTodo = async (ctx) => {
  try {
    const userId = ctx.userId;
    const todoId = ctx.params.id;
    console.log(todoId);
    const findIfTodoExists = await ctx.db("todo").where({ id: todoId });

    if (findIfTodoExists.length == 0) {
      ctx.status = 404;
      ctx.body = "Todo does not exist";
      return;
    }

    const recievedBody = await JSON.parse(ctx.request.body.data);

    const title = recievedBody.title;
    const description = recievedBody.description;
    const completed = recievedBody.completed;

    console.log("recievedBody", recievedBody, completed);
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

    const data = await ctx.db
      .select("todo.*")
      .from("todo")
      .leftJoin("user", "user.id", "todo.user_id")
      .where({ user_id: userId });
    ctx.status = 200;
    ctx.body = data;
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
    const data = await ctx.request.body.data;
    const parsed = JSON.parse(data);

    const { email, password, name } = parsed;

    console.log(email, password, name);

    if (!(email && password && name)) {
      ctx.status = 400;
      ctx.body = "Provide all credentials";
      return;
    }

    const checkIfUserAlreadyExists = await ctx
      .db("user")
      .where({ email: email });

    console.log("user alreday exists", checkIfUserAlreadyExists);

    if (checkIfUserAlreadyExists.length > 0) {
      ctx.body = "User already exists!";
      return;
    }

    // encrypt the password
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        // Store hash in your password DB.
        parsed.password = hash;
        await ctx.db("user").insert(parsed);
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
    const credentialsFromClient = await JSON.parse(ctx.request.body.data);

    const { email, password } = credentialsFromClient;
    console.log("parsed email and password ->", email, password);

    // see if all credentials have been provided

    if (!email || !password) {
      ctx.status = 400;
      ctx.body = "Provide all credentials";
      return;
    }

    // // find if user exists;
    const user = await ctx.db("user").where({ email: email });
    console.log("user =>", user);
    if (user.length == 0) {
      ctx.body = "User does not exists!";
      ctx.status = 404;
      return;
    }

    // // see if password is right
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
    console.log(name, id);

    // send jwt as cookie
    const secretKey = process.env.jwtSecretKey;

    const payload = {
      name: name,
      userId: id,
    };

    const token = jwt.sign(payload, secretKey);
    console.log(token);

    // write head using node's method
    ctx.res.setHeader("Set-cookie", [`auth-token=${token};`]);

    ctx.body = "User signed in successfully!";
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = "Internal server error";
  }
};

const checkIfUserIsLoggedIn = async (ctx) => {
  try {
    const userId = ctx.userId;
    console.log("check if logged in =>", userId);

    if (!userId) {
      ctx.body = { message: "User is not logged in", loggedIn: false };
      ctx.status = 401;
      return;
    }

    ctx.body = { message: "User is logged in", loggedIn: true };
    ctx.status = 200;
  } catch (error) {
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

  // check if user is logged in
  checkIfUserIsLoggedIn,
};
