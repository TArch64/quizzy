export class Controller {
    prefix = '';
    #routes = [];

    attach(router) {
        for (const route of this.#routes) {
            router[route.method](route.path, route.handler);
        }
    }

    #handleRoute(method, path, handler) {
        this.#routes.push({
            method,
            path,
            handler: this.#decorateHandler(handler)
        });
    }

    #decorateHandler(handler) {
        return async (req, res) => {
            try {
                res.json(await handler(req));
            } catch (error) {
                res.status(500).json({ error });
            }
        }
    }

    handleGet(path, callback) {
        this.#handleRoute('get', path, callback);
    }

    handlePost(path, callback) {
        this.#handleRoute('post', path, callback);
    }
}
