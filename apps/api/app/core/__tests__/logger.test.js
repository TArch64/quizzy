import {Logger} from "../logger.js";

jest.useFakeTimers();

jest.mock('chalk', () => ({
    yellow: jest.fn((text) => `yellow { ${text} }`),
    red: jest.fn((text) => `red { ${text} }`),
}));

let mockConsoleInfo;
let mockConsoleError;

beforeAll(() => {
    mockConsoleInfo = jest.spyOn(console, 'info').mockReturnValue();
    mockConsoleError = jest.spyOn(console, 'error').mockReturnValue();
});

beforeEach(() => {
    mockConsoleInfo.mockClear();
    mockConsoleError.mockClear();
});

afterAll(() => {
    mockConsoleInfo.mockRestore();
    mockConsoleError.mockRestore();
});

describe('log info', () => {
    test('should color text', () => {
        const logger = new Logger();
        const time = new Date('11.11.2011');

        jest.setSystemTime(time)
        logger.info('test');

        expect(mockConsoleInfo).toHaveBeenCalledWith('yellow { [12:00:00 AM]: test }');
    });
});

describe('log error', () => {
    test('should color text', () => {
        const logger = new Logger();
        const time = new Date('11.11.2011');

        jest.setSystemTime(time)
        logger.error('test');

        expect(mockConsoleError).toHaveBeenCalledWith('red { [12:00:00 AM]: test }');
    });
});
