const { Router } = require('express');
const List = require('../models/List');
const authorizeList = require('../middleware/authorizeList');
const items = require('./items.js');

module.exports = Router()
  .param('listId', (req, res, next, listId) => {
    req.listId = listId;
    next();
  })

  .use('/:listId/items', authorizeList, items)

  .post('/', async ({ body, user }, res, next) => {
    try {
      const list = await List.createForUser(body, user.id);
      res.json(list);
    } catch (e) {
      next(e);
    }
  })

  .get('/:listId', authorizeList, async ({ listId, user }, res, next) => {
    try {
      const list = await List.findOneOfUser(listId, user.id);
      res.json(list);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async ({ user }, res, next) => {
    try {
      const lists = await List.findAllForUser(user.id);
      res.json(lists);
    } catch (e) {
      next(e);
    }
  })

  .put('/:listId', authorizeList, async ({ listId, user, body }, res, next) => {
    try {
      const list = await List.updateForUser(listId, body, user.id);
      res.json(list);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:listId', authorizeList, async ({ listId, user }, res, next) => {
    try {
      const count = await List.destroyForUser(listId, user.id);
      res.json({ deleted: !!count });
    } catch (e) {
      next(e);
    }
  });
  