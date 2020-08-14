const express = require('express');

const api = require('./api');

const router = express.Router();
router.use('/api/v1', api);

module.exports = router;
