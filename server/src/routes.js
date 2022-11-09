const Router = require("@koa/router");

const router = new Router();

router.get("/", (ctx) => {
   ctx.body = "welcome to home page";
});

router.redirect("/login", "/signin");

module.exports = {
   router,
};
