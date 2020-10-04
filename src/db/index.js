/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable sort-keys */
/* eslint-disable no-console */

const elasticsearch = require('elasticsearch');
const _ = require('lodash');

const PROJECT_INDEX = 'projects';

const client = new elasticsearch.Client({
  host: process.env.ES_HOST || '0.0.0.0:9200',
  apiVersion: '7.x',
});

// Get project source from id
async function getProject(id) {
  try {
    const res = await client.get({
      id,
      index: PROJECT_INDEX,
    });
    return _.get(res, ['_source']);
  } catch (err) {
    const found = _.get(err, ['body', 'found']);
    if (!found) {
      return null;
    }
    throw err;
  }
}

// Get project sources matching the search term
async function searchTerm(term, from = 0, size = 10) {
  try {
    const results = await client.search({
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
    const total = _.get(results, ['hits', 'total', 'value']);
    const hits = _.get(results, ['hits', 'hits']);
    const projects = hits.map((hit) => ({
      id: _.get(hit, ['_id']),
      ..._.get(hit, ['_source'], {}),
    }));
    return {
      total,
      results: projects,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  getProject,
  searchTerm,
};
