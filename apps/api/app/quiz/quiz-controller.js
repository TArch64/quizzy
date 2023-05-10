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
        router.get('/:id/order', this.questionOrder.bind(this));
    }

    async questionOrder(req, res) {
        const order = await this.#playQuizService.getOrder(req.params.id);
        res.json({ order });
    }

    async add(req, res) {
        const quiz = await this.#newQuizService.create(req.body);
        res.json({ quiz });
    }
}
