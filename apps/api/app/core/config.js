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

    get sequelize() {
        return {
            dialect: 'postgres',
            sync: { alter: true, logging: console.log },
            logging: console.log,
            host: this.#env.API_DB_HOST,
            port: Number(this.#env.API_DB_PORT),
            database: this.#env.API_DB_NAME,
            username: this.#env.API_DB_USER,
            password: this.#env.API_DB_PASSWORD,
        }
    }
}
