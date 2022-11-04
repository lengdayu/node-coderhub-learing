const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_ALREADY_EXIST,
} = require("../constants/error-type");
const service = require("../service/user.service");
const md5Password = require("../utils/password-handle");

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  //判断用户名或者密码不为空
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  //判断这次注册的用户名是没有被注册过的
  const [rows] = await service.getUserByName(name);
  if (rows.length > 0) {
    const error = new Error(NAME_ALREADY_EXIST);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);

  await next();
};

module.exports = { verifyUser, handlePassword };
