<template>
    <div class="play-results">
        <div>
            <Heading class="play-results__heading" level="1">
                Score {{ score }}%
            </Heading>

            <ul class="play-results__answers">
                <li v-for="answer of resultStore.answers">
                    {{ getAnswerSymbol(answer) }} {{ answer.question }}
                </li>
            </ul>

            <Button class="play-results__replay" look="link" :to="quizPlayRoute">
                Try again
            </Button>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { Heading, Button } from "@/components";
import { usePlayResultStore } from "@/stores";

const resultStore = usePlayResultStore();

const score = computed(() => {
    const { correct, total } = resultStore.score;
    const percent = (correct / total) * 100;
    return percent.toFixed(2).replace('.00', '');
});

const getAnswerSymbol = (answer) => answer.isCorrect ? '\u2713' : '\u2613';

const quizPlayRoute = computed(() => ({
    name: 'play-question',
    params: { quizId: resultStore.quizId }
}));
</script>

<style scoped>
.play-results {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.play-results__heading {
    margin-bottom: 24px;
}

.play-results__answers {
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin-bottom: 8px;
}

.play-results__replay {
    font-size: inherit;
    margin-left: -16px;
}
</style>
