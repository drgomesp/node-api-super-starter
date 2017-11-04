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

const commonTransportOptions = {
  maxSize: 5242880, // 5mb
  json: true,
  handleExceptions: true,
  colorize: true
};

const logger = expressWinston.logger({
  transports: [
    new winston.transports.File({ name: 'errorLog', filename: errorLog, level: 'error' }),
    new winston.transports.File({ name: 'accessLog', filename: accessLog }),
    new winston.transports.Console(),
    new NewrelicWinston({ logging: { level: 'error' }})
  ],
  expressFormat: true,
  colorize: true
});

export default logger;
