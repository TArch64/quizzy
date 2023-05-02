export class NewQuizService {
    #logger;
    #quizRepository;
    #quizQuestionRepository;
    #quizAnswerRepository;

    constructor(options) {
        this.#logger = options.logger;
        this.#quizRepository = options.quizRepository;
        this.#quizQuestionRepository = options.quizQuestionRepository;
        this.#quizAnswerRepository = options.quizAnswerRepository;
    }

    async create(quizData) {
        const transaction = await this.#quizRepository.startTransaction();

        try {
            const { quiz, questions, answers } = this.#createRecords(quizData);
            await quiz.save({ transaction });
            await this.#createQuestions(questions);
            await this.#createAnswers(answers);
            await transaction.commit();
            return quiz;
        } catch(error) {
            transaction.rollback();
            this.#logger.error(error);
        }
    }

    #createRecords(quizData) {
        const quiz = this.#quizRepository.build({});
        const questionRecords = [];
        const answerRecords = [];

        for (const { answers, ...data } of quizData.questions) {
            const questionRecord = this.#quizQuestionRepository.build({
                ...data,
                quizId: quiz.id
            });

            questionRecords.push(questionRecord);

            for (const answerData of answers) {
                const answerRecord = this.#quizAnswerRepository.build({
                    ...answerData,
                    questionId: data.id
                });

                answerRecords.push(answerRecord);
            }
        }

        return { quiz, questions: questionRecords, answers: answerRecords };
    }

    async #createQuestions(records) {
        const json = records.map(record => record.toJSON());
        await this.#quizQuestionRepository.bulkCreate(json);
    }

    async #createAnswers(records) {
        const json = records.map(record => record.toJSON());
        await this.#quizAnswerRepository.bulkCreate(json);
    }
}
