import {Controller} from "../core/controller.js";

export class QuizController extends Controller {
    prefix = 'quiz';
    #quizRepository;

    constructor({ quizRepository }) {
        super();
        this.#quizRepository = quizRepository;
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

    #add(req, res) {
        console.log(req.body);
    }
}
