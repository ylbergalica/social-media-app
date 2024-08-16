const { Sequelize } = require('sequelize');
const config = require('./config.json');

const env = 'development'; // for this task I will keep it in dev
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
});

module.exports = sequelize;
