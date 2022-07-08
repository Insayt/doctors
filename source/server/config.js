/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync } = require('fs');
const { load } = require('js-yaml');
const { resolve } = require('path');

const { log } = require('./utils/logger');
const { ERROR } = require('./utils/logger/constants');

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isLocal = process.env.NODE_ENV === 'local';
const isDocker =
  process.env.IS_DOCKER === 'yes' || process.env.IS_DOCKER === 'true';

const rootPath = resolve(__dirname);

const proxyHost =
  process.env.PROXY_HOST ||
  (isDocker
    ? 'http://host.docker.internal:'
    : isDev
    ? 'https://dev.budu.ru'
    : 'http://localhost');

const getVersion = () => {
  let appVersion = '1.0.0';

  try {
    const filePath = './Chart.yaml';
    const chart = readFileSync(filePath, 'utf8');
    const data = load(chart);

    appVersion = data.appVersion;
  } catch (err) {
    log(ERROR, `JS Error - ${err.message}`);
  }
  return appVersion;
};

const appVersion = getVersion();

module.exports = {
  appVersion,
  isDev,
  isProd,
  isLocal,
  settings: {
    ver: { appVersion },
    rid: Math.random().toString().substr(2),
  },
  getVersion,
  rootPath,
  proxyHost,
};
