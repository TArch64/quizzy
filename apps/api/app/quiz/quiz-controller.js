import {Controller} from "../core/controller.js";

export class QuizController extends Controller {
    prefix = 'quiz';
    #prisma;
    #newQuizService;

    constructor({ prisma, newQuizService }) {
        super();
        this.#prisma = prisma;
        this.#newQuizService = newQuizService;
    }

    defineRoutes(router) {
        router.get('/:id', this.#byId.bind(this));
        router.post('/', this.#add.bind(this));
    }

    async #byId(req, res) {
        const quiz = await this.#prisma.quiz.findUnique({
            where: { id: req.params.id }
        });
        res.json({ quiz });
    }

    async #add(req, res) {
        const quiz = await this.#newQuizService.create(req.body);
        res.json({ quiz });
    }
}
