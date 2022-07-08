/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line max-len
// https://confluence.renhealth.com/pages/viewpage.action?pageId=10092608#id-%D0%A2%D1%80%D0%B5%D0%B1%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%D0%BA%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%B0%D0%BC-%D0%9C%D0%BE%D0%BD%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%BD%D0%B3
const { resolve } = require('path');
const { appVersion, rootPath, isDev } = require('../config');
const { useRewrite } = require('./rewrite');

const useRoutes = (app) => {
  if (isDev) {
    useRewrite(app);
  }

  app.get('/healthz', (req, res) => {
    res.status(200).send('Ok');
  });

  app.get('/readyz', (req, res) => {
    res.status(200).send('Ok');
  });

  app.get('/version', (req, res) => res.status(200).send(appVersion));

  app.get('*', (req, res) => {
    res.sendFile(resolve(rootPath, '../dist/index.html'));
  });
};

module.exports = {
  useRoutes,
};
