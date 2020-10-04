/* eslint-disable no-console */
const express = require('express');
const httpStatusCodes = require('http-status-codes');

const db = require('../../db');

const { StatusCodes } = httpStatusCodes;

const router = express.Router();

/**
 * GET projects endpoint:
 * querystring parameters:
 *  - id: ID of the project as stored in the database.
 * response:
 *  - project source data as JSON.
 * errors:
 *  - 400 if incorrect request format was used.
 *  - 404 if project for the given id cannot be found.
 *  - 503 if an internal exception occurred.
 */
router.get('/', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    // TODO: error messages
    res.status(StatusCodes.BAD_REQUEST).end();
  }
  try {
    const project = await db.getProject(id);
    if (project) {
      res.json(project);
    } else {
      res.status(StatusCodes.NOT_FOUND).end();
    }
  } catch (err) {
    console.error(err);
    // TODO: error messages
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
