import {usePlayResultStore} from "../play-result-store";
import {useHttp} from "../../composables";
import {createPinia, setActivePinia} from "pinia";

jest.mock('../../composables', () => ({
    useHttp: jest.fn()
}));

const createHttp = () => ({
    get: jest.fn().mockResolvedValue(null)
});

beforeEach(() => setActivePinia(createPinia()));

describe('load result data', () => {
    test('should send request', async () => {
        const http = createHttp();
        useHttp.mockReturnValueOnce(http);

        const store = usePlayResultStore();

        http.get.mockResolvedValue({
            result: { quizId: 'test' }
        });
        await store.load('test');

        expect(http.get).toHaveBeenCalledWith('/api/quiz-results/test');
    });

    test('should save loaded data', async () => {
        const http = createHttp();
        useHttp.mockReturnValueOnce(http);

        const store = usePlayResultStore();

        http.get.mockResolvedValue({
            result: { quizId: 'test' }
        });
        await store.load('test');

        expect(store.result).toEqual({ quizId: 'test' });
    });
});
