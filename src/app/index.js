const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const userRouter = require("../router/user.router");
const authROouter = require("../router/auth.router");
const errorHandler = require("./error-handle");

const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(authROouter.routes());
app.use(authROouter.allowedMethods());

app.on("error", errorHandler);

module.exports = app;
