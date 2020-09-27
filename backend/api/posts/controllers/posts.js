'use strict';

const {sanitizeEntity} = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async find(ctx) {
    let entity = strapi.services.posts.find({published: true});

    return sanitizeEntity(entity, {model: strapi.models.posts});
  },
  async findOne(ctx) {
    const {id} = ctx.params;

    if (!id) ctx.throw(404, 'Post not found');

    let entity = await strapi.services.posts.find({slug: id, published: true});

    if (entity.length !== 1) ctx.throw(404, 'Post not found');

    return sanitizeEntity(entity, {model: strapi.models.posts});
  }
};
