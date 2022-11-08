const JWT = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");

const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_DOES_NOT_EXITS,
  PASSWORD_IS_INCORRENT,
  UN_AUTHORIZATION,
} = require("../constants/error-type");
const service = require("../service/user.service");
const md5Password = require("../utils/password-handle");

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  //判断用户名密码是否为空
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  //判断用户是否存在
  const [rows] = await service.getUserByName(name);
  if (!rows.length) {
    const error = new Error(USER_DOES_NOT_EXITS);
    return ctx.app.emit("error", error, ctx);
  }

  //判断密码是否正确（加密）
  if (rows[0].password !== md5Password(password)) {
    const error = new Error(PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = rows[0];

  await next();
};

const verifyAuth = async (ctx, next) => {
  //1.获取token
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");

  //2.验证token(ID,NAME,IAT,EXP)
  try {
    const result = JWT.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });
    ctx.user = result;
    console.log(result);
    await next();
  } catch (error) {
    const err = new Error(UN_AUTHORIZATION);
    ctx.app.emit("error", err, ctx);
  }
};
module.exports = {
  verifyLogin,
  verifyAuth,
};
