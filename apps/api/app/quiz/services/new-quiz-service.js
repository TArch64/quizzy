export class NewQuizService {
    #logger;
    #prisma;

    constructor(options) {
        this.#logger = options.logger;
        this.#prisma = options.prisma;
    }

    async create(data) {
        return this.#prisma.quiz.create({
            data: {
                questions: {
                    create: data.questions.map(questionData => ({
                        id: questionData.id,
                        question: questionData.question,
                        correct: questionData.correct,
                        answers: {
                            create: questionData.answers.map(answerData => ({
                                id: answerData.id,
                                text: answerData.text
                            }))
                        }
                    }))
                }
            },
            include: {
                questions: {
                    include: {
                        answers: true
                    }
                }
            }
        });
    }
}
