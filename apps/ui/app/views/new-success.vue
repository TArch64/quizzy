<template>
    <div class="new-success">
        <h1 class="new-success__title">
            Quiz Created!
        </h1>

        <CopyButton :copy-text="playLink" text="Copy Link" />
    </div>
</template>

<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";
import CopyButton from "@/components/button/copy-button.vue";

const route = useRoute();

const quizId = computed(() => route.params.quizId);
const playLink = computed(() => new URL(`${location.origin}/play/${quizId.value}`));
</script>

<style scoped>
.new-success {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.new-success__title {
    margin-top: 0;
    margin-bottom: 32px;
}
</style>
