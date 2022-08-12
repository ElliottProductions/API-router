const List = require('../models/List');

module.exports = async (req, res, next) => {
  try {
    const list = await List.findByPk(req.params.listId);
    if (!list || list.userId !== req.user.id) {
      throw new Error('You do not have access to view this page');
    }
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
