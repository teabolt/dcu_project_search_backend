const express = require('express');

const projects = require('./projects');
const search = require('./search');

const router = express.Router();
router.use('/projects', projects);
router.use('/search', search);

module.exports = router;
