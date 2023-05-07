import {ref} from "vue";
import {defineStore} from "pinia";
import {useHttp} from "@/composables/use-http";

export const usePlayStore = defineStore('play', () => {
    const http = useHttp();
    const order = ref([]);

    async function loadOrder(quizId) {
        const data = await http.get(`/api/quiz/${quizId}/order`);
        order.value = data.order;
    }

    return { order, loadOrder };
});
