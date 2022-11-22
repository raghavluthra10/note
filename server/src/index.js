const Koa = require("koa");
const port = 8000;
const { router } = require("./routes");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const app = new Koa();

const { db } = require("../database");

app.use(bodyParser({ enableTypes: ["json", "text"] }));

// app.proxy = true;
app.use(
  cors({
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,OPTIONS",
    allowHeaders: "Origin, Content-Type, X-Auth-Token,  status, Set-Cookie",
    credentials: "true",
  })
);
// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*");
//   // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");
//   // ctx.set("Access-Control-Allow-Credentials", "true");
//   ctx.res.setHeader("Access-Control-Allow-Credentials", "true");
//   ctx.set(
//     "Access-Control-Allow-Headers",
//     "Origin, Content-Type, X-Auth-Token, auth-token, status, Set-Cookie"
//   );
//   ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//   await next();
// });

// add db access to context prototype so that it is available throughout the app
app.context.db = db;

app.use(router.routes());

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
