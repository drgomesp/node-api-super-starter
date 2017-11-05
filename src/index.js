import 'newrelic';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import chalk from 'chalk';
import compression from 'compression';

import routes from 'routes';
import config from './config';
import cors from 'utils/cors';
import logger from 'utils/logger';

const app = express();

// headers configuration
app.use(helmet(config.helmet));

// GZip
app.use(compression({
  threshold: 512
}));

// logger middleware
app.use(logger);

// CORS
app.use(cors);

// Routes
app.use('/', routes);

app.listen(config.port, () => {
  console.log(chalk.cyan(`Listening on port ${config.port}!`));
});

app.on('error', function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

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
