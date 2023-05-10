import {Controller} from "../core/controller.js";

export class QuizQuestionController extends Controller {
    prefix = 'questions'
    #playQuizService;

    constructor({ playQuizService }) {
        super();
        this.#playQuizService = playQuizService;
    }

    defineRoutes(router) {
        router.get('/:id', this.byId.bind(this));
    }

    async byId(req, res) {
        const question = await this.#playQuizService.getQuestion(req.params.id);
        res.json({ question });
    }
}
