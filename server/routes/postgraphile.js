const express = require('express');
const router = express.Router();
const { postgraphile } = require('postgraphile');
const postgraphileConfig = require('../../config/postgraphile');

router.use(postgraphile(
  process.env.POSTGRAPHILE_URL,
  "app",
  postgraphileConfig,
));

module.exports = router;
