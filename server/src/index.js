const Koa = require("koa");
const port = 8000;
const { router } = require("./routes");
const bodyParser = require("koa-bodyparser");

const app = new Koa();

const { db } = require("../database");

app.use(bodyParser({ enableTypes: ["json", "text"] }));

// add db access to context prototype so that it is available throughout the app
app.context.db = db;

app.use(router.routes());

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
