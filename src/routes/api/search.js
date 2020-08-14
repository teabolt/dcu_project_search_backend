const express = require('express');

const db = require('../../db');
const searchUtils = require('../../utils/search');

const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.q;
  // Parse query here
  const parsedQuery = searchUtils.parseQuery(query);
  try {
    // Query ElasticSearch here
    const results = await db.searchTerm(parsedQuery);
    // Return results here
    res.json(results);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    res.status(503).end();
  }
});

module.exports = router;
