import {Controller} from "../controller.js";

class MockRouter {
    #handlers = [];

    get = jest.fn((path, handler) => {
        this.#handlers.push({ method: 'get', path, handler });
    });

    post = jest.fn((path, handler) => {
        this.#handlers.push({ method: 'post', path, handler });
    });

    async mockHandle(req, res) {
        const handlers = this.#handlers.filter(handler => {
            return handler.method === req.method && handler.path === req.path;
        });
        for (const {handler} of handlers) {
            await handler(req, res);
        }
    }
}

const createMockResponse = () => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
});

describe('attach routes', () => {
    test('should attach get handler', () => {
        const controller = new Controller();
        const router = new MockRouter();

        controller.handleGet('/test', jest.fn());
        controller.attach(router);

        expect(router.get).toHaveBeenCalledWith('/test', expect.any(Function));
    });

    test('should attach post handler', () => {
        const controller = new Controller();
        const router = new MockRouter();

        controller.handlePost('/test', jest.fn());
        controller.attach(router);

        expect(router.post).toHaveBeenCalledWith('/test', expect.any(Function));
    });

    test('should response json with returned async value', async () => {
        const controller = new Controller();
        const router = new MockRouter();
        const request = { method: 'get', path: '/test' };
        const response = createMockResponse();
        const responseBody = { success: true };

        controller.handleGet('/test', jest.fn().mockResolvedValue(responseBody));
        controller.attach(router);

        await router.mockHandle(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(responseBody);
    });

    test('should response json with returned sync value', async () => {
        const controller = new Controller();
        const router = new MockRouter();
        const request = { method: 'get', path: '/test' };
        const response = createMockResponse();
        const responseBody = { success: true };

        controller.handleGet('/test', jest.fn().mockReturnValue(responseBody));
        controller.attach(router);

        await router.mockHandle(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(responseBody);
    });

    test('should handle error as internal server error', async () => {
        const controller = new Controller();
        const router = new MockRouter();
        const request = { method: 'get', path: '/test' };
        const response = createMockResponse();

        controller.handleGet('/test', jest.fn().mockRejectedValue(new Error('test')));
        controller.attach(router);

        await router.mockHandle(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({ error: 'test' });
    });

    test('should handle any other exception as internal server error', async () => {
        const controller = new Controller();
        const router = new MockRouter();
        const request = { method: 'get', path: '/test' };
        const response = createMockResponse();

        controller.handleGet('/test', jest.fn().mockRejectedValue({ test: true }));
        controller.attach(router);

        await router.mockHandle(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({ error: { test: true } });
    });
});
