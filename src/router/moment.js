const Router = require("koa-router");

const {
  create,
  detail,
  list,
  update,
  remove,
} = require("../controller/moment.controll.js");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/:momentId", detail);
momentRouter.get("/", list);

// 1.用户必须登录 2.用户具备权限
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

module.exports = momentRouter;
