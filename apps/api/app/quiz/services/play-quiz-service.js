export class PlayQuizService {
    #prisma;

    constructor({ prisma }) {
        this.#prisma = prisma;
    }

    async getQuizById(quizId) {
        return this.#prisma.quiz.findUnique({
            where: { id: quizId },

            include: {
                questions: {
                    include: {
                        answers: true
                    }
                }
            }
        });
    }

    async createResult({ quizId, answers }) {
        return this.#prisma.quizResult.create({
            data: {
                quizId,

                answers: {
                    create: answers.map(this.#formatAnswerResult.bind(this))
                }
            }
        });
    }

    #formatAnswerResult({ questionId, answerId }) {
        return {
            questionId,
            selectedId: answerId
        };
    }

    getResultById(resultId) {
        return this.#prisma.quizResult.findUnique({
            where: { id: resultId },

            select: {
                answers: {
                    select: {
                        selectedId: true,

                        question: {
                            select: {
                                text: true,
                                correctId: true,

                                answers: {
                                    select: {
                                        id: true,
                                        text: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }
}
