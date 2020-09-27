/* eslint-disable no-sync */
/* eslint-disable no-console */

const fs = require('fs');
const http = require('http');
const https = require('https');

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

require('./config/env');

const routes = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

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

const IS_HTTPS = process.env.NODE_ENV === 'production';

let server;
if (IS_HTTPS) {
  const credentials = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT),
  };
  server = https.createServer(credentials, app);
} else {
  server = http.createServer(app);
}

// Start server
if (server) {
  server.listen({ port: PORT, host: HOST }, () => {
    console.log(
      `App listening at http${IS_HTTPS ? 's' : ''}://${HOST}:${PORT}`
    );
  });
} else {
  console.error(`Server is not created: ${server}`);
}
