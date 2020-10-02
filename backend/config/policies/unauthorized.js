module.exports = async (ctx, next) => {
  return ctx.throw(403, 'Forbidden');
}
