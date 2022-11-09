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

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const { offset, size } = ctx.query;

    // 2.查询列表
    const result = await MomentService.getMomentList(offset, size);
    ctx.body = result;
  }

  async update(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    // 2.修改内容
    const result = await MomentService.update(content, momentId);
    ctx.body = result;
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const { momentId } = ctx.params;

    // 2.删除内容
    const result = await MomentService.remove(momentId);
    ctx.body = result;
  }
}

module.exports = new MomentControl();
