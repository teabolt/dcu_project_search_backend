const express = require('express');

const db = require('../../db');
const searchUtils = require('../../utils/search');

const router = express.Router();

/**
 * GET search endpoint:
 *  querystring parameters:
 *    - q: the search query to look up projects with (required)
 *    - from: pagination offset, which index to return results from (defaults to 0)
 *    - limit: pagination size, how many results to return (defaults to 10)
 *  response:
 *    {
 *       total: number of matching projects,
 *       results: array of each matching project,
 *    }
 *  errors:
 *    status 503 if an exception has occurred.
 */
router.get('/', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    // TODO: error messages
    res.status(400).end();
  }
  const { from, limit } = req.query;
  const parsedQuery = searchUtils.parseQuery(query);
  try {
    const results = await db.searchTerm(parsedQuery, from, limit);
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
