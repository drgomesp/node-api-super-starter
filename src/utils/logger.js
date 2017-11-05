import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import winston from 'winston';
import expressWinston from 'express-winston';
import NewrelicWinston from 'newrelic-winston';

import {
  existsOrCreate
} from 'utils/file';

const logsFolder = path.join(__dirname, '../../logs');
const accessLog = path.join(logsFolder, 'access_log.log');
const errorLog = path.join(logsFolder, 'error_log.log');
const nrLog = path.join(logsFolder, 'newrelic_agent.log');

mkdirp.sync(logsFolder);
existsOrCreate(accessLog);
existsOrCreate(errorLog);
existsOrCreate(nrLog);

const logger = require('express-bunyan-logger')({
  streams: [{
    level: 'debug',
    stream: process.stdout
  }, {
    level: 'info',
    stream: fs.createWriteStream(path.join(logsFolder, 'access_log.log'))
  }, {
    level: 'error',
    stream: fs.createWriteStream(path.join(logsFolder, '/error_log.log'))
  }]
})

export default logger;
