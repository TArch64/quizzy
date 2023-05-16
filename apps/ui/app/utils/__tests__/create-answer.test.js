import {createAnswer} from "../create-answer";
import {v4 as uuid} from "uuid";

jest.mock('uuid');

describe('create answer', () => {
    test('should return new answer', () => {
        const answer = createAnswer();

        expect(answer).toEqual({ id: 'test', text: '' });
    });

    test('should create multiple answers', () => {
        uuid.mockReturnValueOnce('1').mockReturnValueOnce('2');

        const answer1 = createAnswer();
        const answer2 = createAnswer();

        expect(answer1).toEqual({ id: '1', text: '' });
        expect(answer2).toEqual({ id: '2', text: '' });
    });
});
