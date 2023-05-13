import {Controller} from "../core/controller.js";

export class QuizController extends Controller {
    prefix = 'quiz';
    #newQuizService;
    #playQuizService;

    constructor({ newQuizService, playQuizService }) {
        super();
        this.#newQuizService = newQuizService;
        this.#playQuizService = playQuizService;
    }

    defineRoutes(router) {
        router.post('/', this.add.bind(this));
        router.get('/:id', this.byId.bind(this));
    }

    async byId(req, res) {
        const quiz = await this.#playQuizService.getQuizById(req.params.id);
        res.json({ quiz });
    }

    async add(req, res) {
        const quiz = await this.#newQuizService.create(req.body);
        res.json({ quiz });
    }
}
