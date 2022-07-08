/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env') });
const { log, setSettings, logNodeErrors } = require('./utils/logger');
const { INFO } = require('./utils/logger/constants');
const { settings, isDev } = require('./config');
const { app } = require('./express');

const port = process.env.PORT || 80;
const host = process.env.HOST || '0.0.0.0';

setSettings(settings);
logNodeErrors();

async function start() {
  app.listen(port, host);

  log(
    INFO,
    `Lkbudu (${
      isDev ? 'dev' : 'prod'
    }) start on port: ${port} at ${new Date().toLocaleString()}`,
    200
  );
}

start();
