const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  //判断用户名密码是否为空

  //判断用户是否存在

  //判断密码是否正确（加密）

  await next();
};

module.exports = {
  verifyLogin,
};
