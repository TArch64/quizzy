import {Controller} from "../core/controller.js";

export class QuizResultController extends Controller {
    prefix = 'quiz-results';
    #playQuizService;

    constructor({ playQuizService }) {
        super();
        this.#playQuizService = playQuizService;
    }

    defineRoutes(router) {
        router.post('/', this.createResult.bind(this));
        router.get('/:id', this.byId.bind(this));
    }

    async createResult(req, res) {
        const result = await this.#playQuizService.createResult(req.body);
        res.json({ result });
    }

    async byId(req, res) {
        const result = await this.#playQuizService.getResultById(req.params.id);
        res.json({ result });
    }
}
