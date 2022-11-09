const Koa = require("koa");
const port = 8000;
const app = new Koa();

const { router } = require("./routes");

const { db } = require("../database");

// add db access to context prototype so that it is available throughout the app
app.context.db = db;

app.use(router.routes());

app.listen(port, () => {
   console.log(`Server running on PORT: ${port}`);
});
