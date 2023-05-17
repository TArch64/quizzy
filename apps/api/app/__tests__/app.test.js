import {App} from "../app.js";

const createServer = () => ({
    use: jest.fn(),
    listen: jest.fn((port, host, onStarted) => onStarted())
});

const createConfig = () => ({
    server: {}
});

const createLogger = () => ({
    info: jest.fn()
});

function createApp({ server, logger } = {}) {
    return new App({
        server: server ?? createServer(),
        config: createConfig(),
        logger: logger ?? createLogger()
    });
}

const createController = (attrs = {}) => ({
    attach: jest.fn(),
    ...attrs
});

describe('register middleware', () => {
    test('should register middleware', () => {
        const server = createServer();
        const app = createApp({ server });
        const middleware = jest.fn();

        app.useMiddleware(middleware);

        expect(server.use).toHaveBeenCalledWith(middleware);
    });
});

describe('register controller', () => {
    test('should register controller', () => {
        const server = createServer();
        const app = createApp({ server });
        const controller = createController({ prefix: 'test' })

        app.useController(controller);

        expect(server.use).toHaveBeenCalledWith('/api/test', expect.anything());
    });

    test('should attach controller', () => {
        const app = createApp();
        const controller = createController()

        app.useController(controller);

        expect(controller.attach).toHaveBeenCalled();
    });
});

describe('start app', () => {
    test('start server', async () => {
        const server = createServer();
        const app = createApp({ server });

        await app.start();

        expect(server.listen).toHaveBeenCalled();
    });

    test('should report start', async () => {
        const logger = createLogger();
        const app = createApp({ logger });

        await app.start();

        expect(logger.info).toHaveBeenCalledWith('Server started');
    });
});
