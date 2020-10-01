/* eslint-disable no-console */
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  console.error(`dotenv error: ${result.error}`);
}
