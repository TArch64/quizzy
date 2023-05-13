import { Router } from 'express';

export class App {
    #server;
    #config;
    #logger;

    constructor({ server, config, logger }) {
        this.#server = server;
        this.#config = config;
        this.#logger = logger;
    }

    useMiddleware(middleware) {
        this.#server.use(middleware);
    }

    useController(controller) {
        const router = new Router();
        controller.attach(router);
        this.#server.use(`/api/${controller.prefix}`, router);
    }

    async start() {
        return new Promise(resolve => {
            const { port, host } = this.#config.server;

            this.#server.listen(port, host, () => {
                this.#onStart();
                resolve();
            });
        })
    }

    #onStart() {
        this.#logger.info('Server started');
    }
}
