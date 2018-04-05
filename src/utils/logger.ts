import { LoggerFacade } from './interfaces/logger-facade';
import { default as chalk } from 'chalk';

export class Logger implements LoggerFacade {

    private readonly identifier: string;

    constructor(identifier: string) {
        if (identifier.length > 10) {
            this.identifier = identifier.substr(0, 9);
        } else {
            const missing = 10 - identifier.length;
            let spaces = '';
            for (let i = 0; i < missing; i++) {
                spaces += ' ';
            }
            this.identifier = identifier + spaces;
        }
    }

    private stringify(...params: any[]): string {
        if (Array.isArray(params)) {
            return params.join(' ');
        }
        return params;
    }

    debug(message?: any, ...params: any[]) {
        console.log(chalk.blue('[DEBUG]'), chalk.italic.grey(this.identifier), message, this.stringify(params));
    }

    error(message?: any, ...params: any[]) {
        console.log(chalk.red('[ERROR]'), chalk.italic.grey(this.identifier), message, this.stringify(params));
    }

    info(message?: any, ...params: any[]) {
        console.log(chalk.blue('[INFO] '), chalk.italic.grey(this.identifier), message, this.stringify(params));
    }

    log(message?: any, ...params: any[]) {
        console.log(chalk.blue('[INFO] '), chalk.italic.grey(this.identifier), message, this.stringify(params));
    }

    warn(message?: any, ...params: any[]) {
        console.log(chalk.yellow('[WARN] '), chalk.italic.grey(this.identifier), message, this.stringify(params));
    }

}
