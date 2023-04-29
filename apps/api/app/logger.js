import chalk from "chalk";

export class Logger {
    info(message) {
        console.info(this.#formatMessage(message));
    }

    #formatMessage(message) {
        return this.#prefix + message.toString();
    }

    get #prefix() {
        return chalk.yellow(`[${this.#time}]: `);
    }

    get #time() {
        return new Date().toLocaleTimeString();
    }
}
