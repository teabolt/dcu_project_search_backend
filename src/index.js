const express = require('express');
const morgan = require('morgan');

require('./config/env');

const routes = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(morgan('combined'));

// Register routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
