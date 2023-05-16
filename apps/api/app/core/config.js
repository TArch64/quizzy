export class Config {
    #env;

    constructor({ env }) {
        this.#env = env;
    }

    get server() {
        return {
            port: this.#env.API_PORT,
            host: this.#env.API_HOST
        };
    }

    get prisma() {
        return {
            log: ['query', 'info', 'warn', 'error'],
        };
    }
}
