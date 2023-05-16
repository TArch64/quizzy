import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useHttp } from "@/composables";

export const usePlayResultStore = defineStore('playResult', () => {
    const http = useHttp();
    const result = ref(null);

    async function load(resultId) {
        const data = await http.get(`/api/quiz-results/${resultId}`);
        result.value = data.result;
    }

    const answers = computed(() => {
        return result.value?.answers.map((answer) => ({
            question: answer.question.text,
            selected: answer.question.answers.find((a) => a.id === answer.selectedId),
            correct: answer.question.answers.find((a) => a.id === answer.question.correctId),
            isCorrect: answer.selectedId === answer.question.correctId,
        }));
    });

    const score = computed(() => {
        const correctAnswers = answers.value.filter(answer => answer.isCorrect);

        return {
            correct: correctAnswers.length,
            total: result.value.answers.length,
        };
    });

    const quizId = computed(() => result.value.quizId);

    return {
        answers,
        load,
        score,
        quizId
    };
});
