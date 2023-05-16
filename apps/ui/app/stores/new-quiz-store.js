import { ref, toRef } from "vue";
import { defineStore } from "pinia";
import { useList, useHttp } from "@/composables";
import { createQuestion, createQuizSchema } from "@/utils";

export const useNewQuizStore = defineStore('new-quiz', () => {
    const http = useHttp();

    const quizSchema = createQuizSchema();
    const questions = useList([createQuestion()]);
    const activeQuestion = ref(questions.list[0]);
    const activateQuestion = (question) => activeQuestion.value = question;

    function addQuestion() {
        const question = createQuestion();
        questions.add(question);
        activateQuestion(question);
    }

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

    async function create() {
        const { quiz } = await http.post('/api/quiz', { questions: questions.list });
        return quiz;
    }

    return {
        questions: toRef(questions, 'list'),
        activeQuestion,
        activateQuestion,
        addQuestion,
        removeQuestion,
        validate,
        create
    };
});
