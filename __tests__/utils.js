const pool = require('../lib/utils/pool.js');
const sequelize = require('../lib/utils/sequelize.js');
// const { readFileSync } = require('node:fs');
// const sql = readFileSync('./sql/setup.sql', 'utf-8');
const request = require('supertest');
const app = require('../lib/app');

function setupDb() {
  return Promise.all([
    pool.query('TRUNCATE table items'),
    sequelize.sync({ force: true }),
  ]);
}

function closeAll() {
  return Promise.all([pool.end(), sequelize.close()]);
}

afterAll(closeAll);

const mockUser = {
  email: 'test@example.com',
  password: '123456',
};

async function signUpUser(credentials = mockUser) {
  const agent = request.agent(app);
  const res = await agent.post('/api/v1/auth/signup').send(credentials);
  return { agent, user: res.body, res, credentials };
}

module.exports = {
  setupDb,
  signUpUser,
};
