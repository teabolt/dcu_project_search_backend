const express = require('express');

const db = require('../../db');
const searchUtils = require('../../utils/search');

const router = express.Router();

/**
 * GET search endpoint:
 *  querystring parameters:
 *    - query: the search query to look up projects with
 *  response:
 *    {
 *       total: number of matching projects,
 *       results: array of each matching project,
 *    }
 *  errors:
 *    status 503 if an exception has occurred.
 */
router.get('/', async (req, res) => {
  const { query } = req.query;
  const parsedQuery = searchUtils.parseQuery(query);
  try {
    const results = await db.searchTerm(parsedQuery);
    const total = results.hits.total.value;
    const { hits } = results.hits;
    // eslint-disable-next-line no-underscore-dangle
    const hitsPretty = hits.map((hit) => hit._source);
    res.json({
      total,
      results: hitsPretty,
    });
  } catch (e) {
    res.status(503).end();
  }
});

module.exports = router;
