// DATABASE CONNECTION

const { Pool } = require('pg');

const pool = new Pool();

function query (text, params) { return pool.query(text, params); }

module.exports = query;
