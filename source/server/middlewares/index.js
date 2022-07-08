/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const { resolve } = require('path');
const { log } = require('../utils/logger');
const { ERROR } = require('../utils/logger/constants');

const useMiddleware = (app) => {
  app.use(express.static(resolve(__dirname, '../../dist')));

  app.use((err, req, res, next) => {
    if (!err) {
      return next();
    }

    const { name, message, stack } = err;

    log(ERROR, `Server error: ${name} - ${message} - ${stack}`);
    res.status(500).send('Internal Server Error');
  });
};

module.exports = {
  useMiddleware,
};
