import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import winston from 'winston';
import expressWinston from 'express-winston';
import NewrelicWinston from 'newrelic-winston';

import { existsOrCreate } from 'utils/file';

const logsFolder = path.join(__dirname, '../../logs');
const accessLog = path.join(logsFolder, 'access-log.log');
const errorLog = path.join(logsFolder, 'error-log.log');
const nrLog = path.join(logsFolder, 'newrelic_agent.log');

mkdirp.sync(logsFolder);
existsOrCreate(accessLog);
existsOrCreate(errorLog);
existsOrCreate(nrLog);

winston.exitOnError = false;

const commonTransportOptions = {
  maxSize: 5242880, // 5mb
  json: true,
  handleExceptions: true,
  colorize: true
};

const accessLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      ...commonTransportOptions,
      level: 'info',
      name: 'accessLog',
      filename: accessLog
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
    })
  ]
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      ...commonTransportOptions,
      level: 'warn',
      name: 'errorLog',
      filename: errorLog,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
    }),
    new NewrelicWinston({
      logging: {
        level: 'error'
      }
    })
  ]
});

export {
  accessLogger,
  errorLogger
};
