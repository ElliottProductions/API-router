const { Router } = require('express');
const Item = require('../models/Item');

module.exports = Router({ mergeParams: true })
  .param('itemId', (req, res, next, itemId) => {
    req.itemId = itemId;
    next();
  })

  .post('/', async ({ body, listId }, res, next) => {
    try {
      const item = await Item.createForList(body, listId);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .put('/:itemId', async ({ listId, itemId, body }, res, next) => {
    try {
      const item = await Item.updateForList(itemId, body, listId);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:itemId', async ({ listId, itemId }, res, next) => {
    try {
      const count = await Item.destroyForList(itemId, listId);
      res.json({ deleted: !!count });
    } catch (e) {
      next(e);
    }
  });
  
