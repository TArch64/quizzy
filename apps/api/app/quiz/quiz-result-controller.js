import {Controller} from "../core/controller.js";

export class QuizResultController extends Controller {
    prefix = 'quiz-results';
    #playQuizService;

    constructor({ playQuizService }) {
        super();
        this.#playQuizService = playQuizService;

        this.handlePost('/', this.createResult.bind(this));
        this.handleGet('/:id', this.byId.bind(this));
    }

    async createResult(req) {
        const result = await this.#playQuizService.createResult(req.body);
        return { result };
    }

    async byId(req) {
        const result = await this.#playQuizService.getResultById(req.params.id);
        return { result };
    }
}
