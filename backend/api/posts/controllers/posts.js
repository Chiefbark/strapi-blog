'use strict';

const {sanitizeEntity} = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async find(ctx) {
    let entity = await strapi.services.posts.find({published: true, ...ctx.query});
    return sanitizeEntity(entity, {model: strapi.models.posts});
  },
  async findOne(ctx) {
    const {slug} = ctx.params;
    if (!slug) ctx.throw(404, 'Post not found');

    let entity = await strapi.services.posts.find({slug: slug, published: true});
    if (entity.length !== 1) ctx.throw(404, 'Post not found');
    return sanitizeEntity(entity, {model: strapi.models.posts});
  }
};
