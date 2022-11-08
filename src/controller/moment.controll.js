const MomentService = require("../service/moment.service");

class MomentControl {
  async create(ctx, next) {
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    const result = await MomentService.create(userId, content);
    ctx.body = result;
  }

  async detail(ctx, next) {
    // 1.获取数据(momentId)
    const momentId = ctx.params.momentId;

    // 2.根据id去查询这条数据
    const result = await MomentService.getMomentById(momentId);
    ctx.body = result;
  }
}

module.exports = new MomentControl();
