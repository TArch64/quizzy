import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {useHttp} from "@/composables/use-http";

export const usePlayStore = defineStore('play', () => {
    const http = useHttp();
    const activeQuizId = ref(null);
    const order = ref([]);
    const question = ref(null);

    async function loadOrder(quizId) {
        if (activeQuizId.value === quizId) return;

        activeQuizId.value = quizId;
        const data = await http.get(`/api/quiz/${quizId}/order`);
        order.value = data.order;
    }

    const questionIndex = computed(() => order.value.indexOf(question.value?.id));
    const nextQuestionId = computed(() => order.value[questionIndex.value + 1]);

    async function loadQuestion(questionId) {
        const data = await http.get(`/api/questions/${questionId}`);
        question.value = data.question;
    }

    return {
        loadOrder,
        nextQuestionId,
        loadQuestion,
        question,
    };
});
