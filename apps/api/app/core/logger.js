import chalk from "chalk";

export class Logger {
    info(message) {
        console.info(chalk.yellow(`[${this.#time}]: ${message}`));
    }

    error(message) {
        console.error(chalk.red(`[${this.#time}]: ${message}`));
    }

    get #time() {
        return new Date().toLocaleTimeString();
    }
}
