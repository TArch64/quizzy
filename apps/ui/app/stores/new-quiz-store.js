import {ref, toRef} from "vue";
import {defineStore} from "pinia";
import {v4 as uuid} from "uuid";
import * as yup from 'yup';
import {useList} from "@/composables/use-list";

const createAnswer = () => ({
    id: uuid(),
    text: ''
})

function createQuestion() {
    const answers = [
        createAnswer(),
        createAnswer(),
        createAnswer(),
        createAnswer()
    ];

    return {
        id: uuid(),
        question: '',
        answers,
        correct: answers[0].id
    };
}

const quizAnswerSchema = yup.object({
    id: yup.string().required().uuid(),
    text: yup.string().required()
});

const quizQuestionSchema = yup.object({
    id: yup.string().required().uuid(),
    question: yup.string().required(),
    answers: yup.array().length(4).of(quizAnswerSchema),
    correct: yup.string().uuid().required()
});

const quizSchema = yup.object({
    questions: yup.array().min(1).of(quizQuestionSchema)
});

export const useNewQuizStore = defineStore('new-quiz', () => {
    const questions = useList([createQuestion()]);
    const addQuestion = () => questions.add(createQuestion());
    const activeQuestion = ref(questions.list[0]);
    const activateQuestion = (question) => activeQuestion.value = question;

    function removeQuestion(id) {
        const index = questions.list.findIndex(q => q.id === id);
        questions.remove(id);

        if (activeQuestion.value.id === id) {
            const previousIndex = Math.max(index - 1, 0);
            activateQuestion(questions.list[previousIndex]);
        }
    }

    async function validate() {
        try {
            await quizSchema.validate({ questions: questions.list });
            return null;
        } catch (error) {
            return error;
        }
    }

    return {
        questions: toRef(questions, 'list'),
        activeQuestion,
        activateQuestion,
        addQuestion,
        removeQuestion,
        validate
    };
});
