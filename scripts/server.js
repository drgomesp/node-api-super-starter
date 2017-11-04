require('dotenv').config();

const fs = require('fs');
const path = require('path');

const chalk = require('chalk');

const babelRcPath = path.join(__dirname, '..', '.babelrc');
const babelRc = JSON.parse(fs.readFileSync(babelRcPath, 'utf-8'));

require('babel-register')(Object.assign(
  {},
  babelRc, {
    ignore: /\/(build|node_modules)\//
  }
));

try {
  require(path.join('..', '/src'));
} catch (err) {
  console.error(err);
}
