export class NewQuizService {
    #prisma;

    constructor({ prisma }) {
        this.#prisma = prisma;
    }

    create(data) {
        return this.#prisma.quiz.create({
            data: {
                questions: {
                    create: data.questions.map(this.#formatQuestionRecord.bind(this))
                }
            }
        });
    }

    #formatQuestionRecord(data) {
        return {
            id: data.id,
            question: data.question,
            correct: data.correct,
            answers: {
                create: data.answers.map(this.#formatAnswerRecord.bind(this))
            }
        }
    }

    #formatAnswerRecord(data) {
        return {
            id: data.id,
            text: data.text
        };
    }
}
