const Router = require("koa-router");

const authROouter = new Router();

const { login, success } = require("../controller/auth.controller.js");
const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");

authROouter.post("/login", verifyLogin, login);
authROouter.get("/test", verifyAuth, success);

module.exports = authROouter;
