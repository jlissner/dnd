const express = require('express');
const router = express.Router();
const postgraphile = require('./postgraphile');
const widgets = require('./widgets');

router.use(postgraphile);
router.use(widgets);

module.exports = router;
