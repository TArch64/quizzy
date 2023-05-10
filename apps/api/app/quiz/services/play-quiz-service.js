export class PlayQuizService {
    #prisma;

    constructor({ prisma }) {
        this.#prisma = prisma;
    }

    async getOrder(quizId) {
        const quizQuery = this.#prisma.quiz.findUnique({
            where: { id: quizId }
        });
        const questions = await quizQuery.questions({
            select: { id: true }
        });
        return questions.map((question) => question.id);
    }

    getQuestion(questionId) {
        return this.#prisma.quizQuestion.findUnique({
            where: { id: questionId },
            include: { answers: true }
        });
    }
}
