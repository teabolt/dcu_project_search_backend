const express = require('express');

const routes = require('./routes/index.js');

const PORT = 3001;

const app = express();

app.use(routes);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
