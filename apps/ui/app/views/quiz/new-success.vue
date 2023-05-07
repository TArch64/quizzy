<template>
    <div class="new-success">
        <h1 class="new-success__title">
            Quiz Created!
        </h1>

        <div class="new-success__actions">
            <Button look="primary" :to="playLinkPath">
                Play
            </Button>

            <CopyButton :copy-text="playLink" text="Copy Link" />
        </div>
    </div>
</template>

<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";
import CopyButton from "@/components/button/copy-button.vue";
import Button from "@/components/button/button.vue";

const route = useRoute();

const quizId = computed(() => route.params.quizId);
const playLinkPath = computed(() => `/play/${quizId.value}`);
const playLink = computed(() => new URL(location.origin + playLinkPath.value));
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

.new-success__actions {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
