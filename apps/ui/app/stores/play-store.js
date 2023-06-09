import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useHttp } from "../composables";

export const usePlayStore = defineStore('play', () => {
    const http = useHttp();
    const activeQuiz = ref(null);
    const activeQuestion = ref(null);
    let answeredQuestions = [];

    const questions = computed(() => activeQuiz.value?.questions ?? []);

    const activeQuestionIndex = computed(() => {
        if (!activeQuestion.value) return -1;

        return questions.value.findIndex((question) => {
            return question.id === activeQuestion.value.id;
        });
    });

    const setActiveQuestion = question => activeQuestion.value = question;

    async function loadQuiz(quizId) {
        answeredQuestions = [];
        const data = await http.get(`/api/quiz/${quizId}`);
        activeQuiz.value = data.quiz;
        setActiveQuestion(activeQuiz.value.questions[0]);
    }

    async function selectAnswer(answer) {
        answeredQuestions.push({
            questionId: activeQuestion.value.id,
            answerId: answer.id
        });

        const nextQuestion = questions.value[activeQuestionIndex.value + 1];

        if (nextQuestion) {
            setActiveQuestion(nextQuestion);
            return { nextQuestionId: nextQuestion.id };
        }

        const data = await http.post('/api/quiz-results', {
            quizId: activeQuiz.value.id,
            answers: answeredQuestions
        });

        return { resultId: data.result.id }
    }
    return {
        activeQuiz,
        activeQuestion,
        loadQuiz,
        selectAnswer,
    };
});
