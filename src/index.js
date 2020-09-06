/* eslint-disable no-console */
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

require('./config/env');

const routes = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware

// Logging
app.use(morgan('combined'));

// CORS
const corsOptions = {
  origin: process.env.CORS_ALLOW_ALL ? '*' : process.env.FE_HOST,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Register routes
app.use(routes);

// Start server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
