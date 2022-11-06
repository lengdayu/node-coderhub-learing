const Router = require("koa-router");

const authROouter = new Router();

const { login } = require("../controller/auth.controller.js");
const { verifyLogin } = require("../middleware/auth.middleware");

authROouter.post("/login", verifyLogin, login);

module.exports = authROouter;
