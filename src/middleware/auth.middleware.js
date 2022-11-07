const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_DOES_NOT_EXITS,
  PASSWORD_IS_INCORRENT,
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
  console.log(rows);
  if (!rows.length) {
    const error = new Error(USER_DOES_NOT_EXITS);
    return ctx.app.emit("error", error, ctx);
  }

  //判断密码是否正确（加密）
  if (rows[0].password !== md5Password(password)) {
    const error = new Error(PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

module.exports = {
  verifyLogin,
};
