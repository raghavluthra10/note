const Koa = require("koa");
const port = 8000;
const app = new Koa();

const { connect } = require("../database");

// connect the DB
connect();

const { router } = require("./routes");

app.use(router.routes());

app.listen(port, () => {
   console.log(`Server running on PORT: ${port}`);
});
