import {Controller} from "../core/controller.js";

export class QuizController extends Controller {
    prefix = 'quiz';
    #quizRepository;
    #newQuizService;

    constructor({ quizRepository, newQuizService }) {
        super();
        this.#quizRepository = quizRepository;
        this.#newQuizService = newQuizService;
    }

    defineRoutes(router) {
        router.get('/:id', this.#byId.bind(this));
        router.post('/', this.#add.bind(this));
    }

    async #byId(req, res) {
        const { id } = req.params;
        const quiz = await this.#quizRepository.findById(id);
        res.json({ quiz });
    }

    async #add(req, res) {
        const quiz = await this.#newQuizService.create(req.body);
        res.json({ quiz });
    }
}
