<template>
    <div class="play-results">
        <div>
            <Heading class="play-results__heading" level="1">
                Results ({{ resultStore.score.correct }} / {{ resultStore.score.total }})
            </Heading>

            <ul class="play-results__answers">
                <li v-for="answer of resultStore.answers">
                    {{ getAnswerSymbol(answer) }} {{ answer.question }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { Heading } from "@/components";
import { usePlayResultStore } from "@/stores";

const resultStore = usePlayResultStore();

const getAnswerSymbol = (answer) => answer.isCorrect ? '\u2713' : '\u2613';
</script>

<style scoped>
.play-results {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.play-results__heading {
    margin-bottom: 24px;
}

.play-results__answers {
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: 18px;
}
</style>
