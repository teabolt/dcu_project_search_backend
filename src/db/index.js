/* eslint-disable camelcase */
/* eslint-disable sort-keys */
/* eslint-disable no-console */

const elasticsearch = require('elasticsearch');

const PROJECT_INDEX = 'projects';

const client = new elasticsearch.Client({
  host: process.env.ES_HOST || 'localhost:9200',
  apiVersion: '7.x',
});

async function searchTerm(term, from = 0, size = 10) {
  try {
    const res = await client.search({
      index: PROJECT_INDEX,
      from,
      size,
      body: {
        query: {
          multi_match: {
            query: term,
          },
        },
      },
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  searchTerm,
};
