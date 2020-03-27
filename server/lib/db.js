const { Pool } = require('pg');

const pool = new Pool({connectionString: process.env.POSTGRAPHILE_URL});

module.exports = {
  pool,
};
