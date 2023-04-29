export class App {
    #server;
    #config;
    #logger;

    constructor({ server, config, logger }) {
        this.#server = server;
        this.#config = config;
        this.#logger = logger;
    }

    start() {
        const { port, host } = this.#config.server;
        this.#server.listen(port, host, this.#onStart.bind(this));
    }

    useMiddleware(middleware) {
        this.#server.use(middleware);
    }

    #onStart() {
        this.#logger.info('Server started');
    }
}
