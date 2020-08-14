const search = require('./search');

describe('search parseQuery', () => {
  test('simple query', () => {
    const testQuery = 'test';
    expect(search.parseQuery(testQuery)).toBe(testQuery);
  });
});
