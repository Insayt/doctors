/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');

const { useMiddleware } = require('./middlewares');
const { useRoutes } = require('./routes');

const app = express();

app.enable('trust proxy');
app.disable('x-powered-by');

useMiddleware(app);
useRoutes(app);

module.exports = {
  app,
};
