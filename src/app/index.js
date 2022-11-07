const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const userRouter = require("../router/index");
const errorHandler = require("./error-handle");

const app = new Koa();

app.use(bodyParser());
userRouter(app);
app.on("error", errorHandler);

module.exports = app;
