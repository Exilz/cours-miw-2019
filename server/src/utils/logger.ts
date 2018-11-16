import * as Chalk from 'chalk';
import * as moment from 'moment';

// Quelques fonctions utiles pour rendre plus lisibles les logs dans le terminal

// Instantiation de chalk
const chalk = Chalk.constructor();

export function success (msg: string): void {
    const now = moment().format('HH:mm');
    console.log(chalk.green.bold(`${now} : ${msg}`));
};

export function info (msg: string): void {
    const now = moment().format('HH:mm');
    console.log(chalk.cyan(`${now} : ${msg}`));
};

export function error (msg: string): void {
    const now = moment().format('HH:mm');
    console.log(chalk.bold.red(`${now} : ${msg}`));
};
