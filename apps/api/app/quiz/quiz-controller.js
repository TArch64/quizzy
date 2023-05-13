import {Controller} from "../core/controller.js";

export class QuizController extends Controller {
    prefix = 'quiz';
    #newQuizService;
    #playQuizService;

    constructor({ newQuizService, playQuizService }) {
        super();
        this.#newQuizService = newQuizService;
        this.#playQuizService = playQuizService;

        this.handlePost('/', this.add.bind(this));
        this.handleGet('/:id', this.byId.bind(this));
    }

    async byId(req) {
        const quiz = await this.#playQuizService.getQuizById(req.params.id);
        return { quiz };
    }

    async add(req) {
        const quiz = await this.#newQuizService.create(req.body);
        return { quiz };
    }
}
