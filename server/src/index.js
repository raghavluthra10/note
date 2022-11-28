const Koa = require("koa");
const port = 8000;
const { router } = require("./routes");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const path = require("path");
const serve = require("koa-static");

const clientBundleDir = path.join(__dirname, "../../", "client/dist");
console.log("client bundle =>", clientBundleDir);

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

// add db access to context prototype so that it is available throughout the app
app.context.db = db;

app.use(serve(clientBundleDir));

app.use(router.routes());

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
