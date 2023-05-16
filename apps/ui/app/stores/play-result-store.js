import { ref } from "vue";
import { defineStore } from "pinia";
import { useHttp } from "../composables";

export const usePlayResultStore = defineStore('playResult', () => {
    const http = useHttp();
    const result = ref(null);

    async function load(resultId) {
        const data = await http.get(`/api/quiz-results/${resultId}`);
        result.value = data.result;
    }

    return { load, result };
});
