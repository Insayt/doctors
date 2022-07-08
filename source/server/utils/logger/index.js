/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const { ERROR, WARNING, INFO } = require('./constants');
const getFormatedDate = require('./getFormatedDate');

const defaultName = 'lkbudu';
const settings = {
  machinename: `${defaultName}-init`,
};

const logs = [];

const setSettings = (newSettings) => {
  settings.machinename = `${defaultName}-${newSettings.ver.appVersion}-${newSettings.rid}`;
};

const log = (level, message, status = 500) => {
  const { machinename } = settings;
  const logData = {
    time: getFormatedDate(),
    machinename,
    level,
    message,
    status,
  };
  const stringData = JSON.stringify(logData);

  logs.push(stringData);
  console.log(stringData);
};

const getLogs = () => logs;

const logNodeErrors = () => {
  process.on('exit', (code) => {
    log(ERROR, `Server to exit with code: ${code}`);
  });

  process.on('unhandledRejection', (error) => {
    log(ERROR, `Promise Unhandled Rejection - ${error.message || error}`);
  });

  process.on('uncaughtException', (error) => {
    const { isLocalStand } = settings;

    if (isLocalStand && error && error.message === 'read ECONNRESET') {
      const { message, stack } = error;

      log(ERROR, `UncaughtException - ${message}: ${stack}`);
      return;
    }

    log(ERROR, `UncaughtException - ${error.message || error}: ${error.stack}`);
    process.exit(1);
  });

  process.on('warning', (error) => {
    const { name, message, stack } = error;

    log(WARNING, `Server warning: ${name} - ${message} - ${stack}`);
  });

  process.on('SIGINT', () => {
    log(INFO, 'Server get SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    log(INFO, 'Server get SIGTERM');
    process.exit(0);
  });
};

module.exports = {
  log,
  getLogs,
  setSettings,
  logNodeErrors,
};
