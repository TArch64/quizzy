import {Config} from "../config.js";

describe('server config', () => {
    test('should return server config', () => {
        const config = new Config({
            env: {
                API_PORT: 3000,
                API_HOST: '0.0.0.0'
            }
        });

        expect(config.server).toEqual({ port: 3000, host: '0.0.0.0' })
    });
});
