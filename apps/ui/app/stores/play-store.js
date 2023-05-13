import {toRef} from "vue";
import {defineStore} from "pinia";
import {useHttp} from "@/composables/use-http";
import {usePlayState} from "@/composables/use-play-state";

export const usePlayStore = defineStore('play', () => {
    const http = useHttp();
    const state = usePlayState();

    async function loadQuiz(quizId) {
        if (state.activeQuiz?.id === quizId) return;

        const data = await http.get(`/api/quiz/${quizId}`);
        state.setQuiz(data.quiz);
    }

    async function selectAnswer(answer) {
        state.selectAnswer(answer);

        if (state.nextQuestion) {
            return { nextQuestionId: state.nextQuestion.id };
        }

        const data = await http.post('/api/quiz-results', {
            quizId: state.activeQuiz.id,
            answers: state.answeredQuestions
        });

        return { resultId: data.result.id }
    }

    return {
        activeQuiz: toRef(state, 'activeQuiz'),
        activeQuestion: toRef(state, 'activeQuestion'),
        nextQuestion: toRef(state, 'nextQuestion'),
        loadQuiz,
        selectAnswer,
        setQuestionId: state.setQuestionId
    };
});
