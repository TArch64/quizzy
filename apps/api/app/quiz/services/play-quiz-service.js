export class PlayQuizService {
    #prisma;

    constructor({ prisma }) {
        this.#prisma = prisma;
    }

    getQuizById(quizId) {
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

    createResult({ quizId, answers }) {
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

    async getResultById(resultId) {
        const result = await this.#loadResultData(resultId);
        const answers = this.#formatResultAnswers(result);
        const score = this.#formatResultScore(answers);

        return {
            quizId: result.quizId,
            answers,
            score
        }
    }

    #loadResultData(resultId) {
        return this.#prisma.quizResult.findUnique({
            where: { id: resultId },

            select: {
                quizId: true,

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

    #formatResultAnswers(result) {
        return result.answers.map((answer) => ({
            question: answer.question.text,
            isCorrect: answer.selectedId === answer.question.correctId,
        }));
    }

    #formatResultScore(answers) {
        return {
            correct: answers.filter(answer => answer.isCorrect).length,
            total: answers.length,
        };
    }
}
