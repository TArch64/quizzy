import {NewQuizService} from "../new-quiz-service.js";

const createPrisma = () => ({
    quiz: {
        create: jest.fn().mockResolvedValue()
    }
});

function createService({ prisma }) {
    return new NewQuizService({ prisma });
}

describe('create quiz', () => {
    test('should format db payload', async () => {
        const prisma = createPrisma();
        const service = createService({ prisma });

        await service.create({
            questions: [
                {
                    id: 1,
                    text: 'first-question',
                    correctId: 'first-answer',
                    answers: [
                        {
                            id: 'first-answer',
                            text: 'first'
                        },
                        {
                            id: 'second-answer',
                            text: 'second'
                        }
                    ]
                }
            ]
        });

        expect(prisma.quiz.create.mock.lastCall).toMatchSnapshot();
    });
});
