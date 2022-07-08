/* eslint-disable @typescript-eslint/no-var-requires */

const httpProxy = require('http-proxy');
const { proxyHost, isDev } = require('../config');

const apiProxy = httpProxy.createProxyServer({
  changeOrigin: true,
  preserveHeaderKeyCase: true,
  secure: false,
  toProxy: true,
  followRedirects: true,
});

exports.useRewrite = (app) => {
  app.use('/api', (req, res) => {
    const options = {
      target: proxyHost,
      forward: proxyHost,
      prependPath: true,
    };
    apiProxy.web(req, res, options);
  });

  apiProxy.on('error', function (err) {
    console.error('🚫 Proxy error:', err);
  });

  apiProxy.on('proxyReq', (proxyReq, req, res, options) => {
    const rewritedPath = `${isDev ? '/api' : ''}${req.url}`;
    const host = options.target?.href || '';
    console.info(
      `👉 Rewrite ${req.method} ${req.originalUrl} -> ${host}${rewritedPath}`
    );
    proxyReq.path = rewritedPath;
  });
};
