<template>
    <div class="new-success">
        <Heading class="new-success__title" level="1">
            Quiz Created!
        </Heading>

        <div class="new-success__actions">
            <Button look="primary" :to="playLinkPath">
                Play
            </Button>

            <CopyButton :copy-text="playLink" text="Copy Link" />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { CopyButton, Button, Heading } from "../../components";

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
    margin-bottom: 32px;
}

.new-success__actions {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
