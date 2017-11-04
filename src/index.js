import 'newrelic';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import chalk from 'chalk';
import compression from 'compression';

import routes from 'routes';
import config from './config';
import cors from 'utils/cors';
// import logger, { stream } from 'utils/logger';
// import { accessLogger, errorLogger } from 'utils/loggerExpressWinston';
import { existsOrCreate } from 'utils/file';

const logsFolder = require("path").join(__dirname, '../logs');
const accessLog = require("path").join(logsFolder, 'access-log.log');
const errorLog = require("path").join(logsFolder, 'error-log.log');
const nrLog = require("path").join(logsFolder, 'newrelic_agent.log');
require("mkdirp").sync(logsFolder);
existsOrCreate(nrLog);
existsOrCreate(accessLog);
existsOrCreate(errorLog);


const app = express();

// headers configuration
app.use(helmet(config.helmet));

// GZip
app.use(compression({threshold: 512}));

// logger middleware
// app.use(morgan("combined", { stream }));
// app.use(require('express-bunyan-logger').errorLogger());
app.use(require('express-bunyan-logger')({
  streams: [{
    level: 'debug',
    format: ":remote-address - :user-agent[major] custom logger",
    stream: process.stdout
  }, {
    level: 'info',
    stream: require('fs').createWriteStream(require('path').join(__dirname, '../logs/access-log.log'))
  }, {
    level: 'error',
    stream: require('fs').createWriteStream(require('path').join(__dirname, '../logs/error-log.log'))
  }]
}));

// CORS
app.use(cors);

// Routes
app.use('/', routes);

app.listen(config.port, () => {
  console.log(chalk.cyan(`App listening on port ${config.port}!`));
});

app.on('error', function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

