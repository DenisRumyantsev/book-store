// ESTABLISH

require('dotenv').config();

const { Sequelize } = require('sequelize');

const { PGDATABASE: database, PGUSER: user, PGPASSWORD: password, PGHOST: host } = process.env;

const sequelize = new Sequelize(database, user, password, { host, dialect: 'postgres' });

module.exports = sequelize;
