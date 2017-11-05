import fs from 'fs';
import util from 'util';
import chalk from 'chalk';

const read = util.promisify(fs.readFile);
const open = util.promisify(fs.open);

export function existsOrCreate(path) {
  read(path)
    .catch((err) => open(path, 'w'))
    .then(() => {
      console.log(chalk.cyan(`File ${path} created`));
    })
    .catch((err) => {
      console.log(chalk.red(`File ${path} couldnt be created`));
      console.error(err);
    });
}
