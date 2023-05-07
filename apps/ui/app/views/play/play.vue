<template>
    <RouterView />
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {usePlayStore} from "@/stores/play-store";

const playStore = usePlayStore();
const router = useRouter();
const route = useRoute();

playStore.loadOrder(route.params.quizId).then(() => {
    const [questionId] = playStore.order;
    router.push({ name: 'play-question', params: { questionId } });
});
</script>
