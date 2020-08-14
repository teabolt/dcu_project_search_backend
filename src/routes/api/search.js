const express = require('express');

const db = require('../../db');
const searchUtils = require('../../utils/search');

const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.q;
  const parsedQuery = searchUtils.parseQuery(query);
  try {
    const results = await db.searchTerm(parsedQuery);
    res.json(results);
  } catch (e) {
    res.status(503).end();
  }
});

module.exports = router;
