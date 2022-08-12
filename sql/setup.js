/* eslint-disable no-console */
// require app in order to import all needed Models
require('../lib/app');
const sequelize = require('../lib/utils/sequelize.js');

async function sync() {
  try {
    await sequelize.sync({ alter: true });
    const { host, port, database } = sequelize.config;
    console.log(
      '🔄 Sequelize models synced to',
      `"${database}" on ${host}:${port}`
    );
  } catch (err) {
    console.error(err);
  } finally {
    sequelize.close();
  }
}

sync();
