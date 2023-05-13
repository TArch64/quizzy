<template>
    <div class="play-results">
        <Heading level="1">
            Results ({{ resultStore.score.correct }} / {{ resultStore.score.total }})
        </Heading>
    </div>
</template>

<script setup>
import Heading from "@/components/heading";
import {usePlayResultStore} from "@/stores/play-result-store";

const resultStore = usePlayResultStore();
</script>

<style scoped>
.play-results {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
