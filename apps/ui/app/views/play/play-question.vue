<template>
    <div class="play-question">
        <div class="play-question__question">
            <Heading level="1" class="play-question__question-text">
                {{ playStore.question.question }}
            </Heading>
        </div>

        <div class="play-question__answers">
            <Button
                v-for="answer of playStore.question.answers"
                :key="answer.id"
                look="link"
                class="play-question__answer"
            >
                <span class="play-question__answer-text">
                    {{ answer.text }}
                </span>
            </Button>
        </div>
    </div>
</template>

<script setup>
import {usePlayStore} from "@/stores/play-store";
import Heading from "@/components/heading.vue";
import Button from "@/components/button/button.vue";

const playStore = usePlayStore();
</script>

<style scoped>
.play-question {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.play-question__question {
    flex-basis: 0;
    flex-grow: 1;
    display: flex;
}

.play-question__answers {
    flex-basis: 0;
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    border-top: 1px solid black
}

.play-question__answer {
    display: flex;
}

.play-question__question-text,
.play-question__answer-text {
    margin: auto;
}

.play-question__answer:nth-child(odd) {
    border-right: 1px solid black;
}

.play-question__answer:nth-child(-n+2) {
    border-bottom: 1px solid black;
}
</style>
