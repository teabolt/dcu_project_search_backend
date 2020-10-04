/* eslint-disable no-console */
const express = require('express');
const httpStatusCodes = require('http-status-codes');

const db = require('../../db');
const searchUtils = require('../../utils/search');

const { StatusCodes } = httpStatusCodes;

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
    res.status(StatusCodes.BAD_REQUEST).end();
  }
  const { from, limit } = req.query;
  const parsedQuery = searchUtils.parseQuery(query);
  try {
    const results = await db.searchTerm(parsedQuery, from, limit);
    res.json(results);
  } catch (err) {
    // TODO: error messages
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
