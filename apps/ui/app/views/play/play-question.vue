<template>
    <div class="play-question">
        <div class="play-question__question">
            <Heading level="1" class="play-question__question-text">
                {{ playStore.activeQuestion.question }}
            </Heading>
        </div>

        <div class="play-question__answers">
            <Button
                v-for="answer of playStore.activeQuestion.answers"
                :key="answer.id"
                look="link"
                class="play-question__answer"
                @click="selectAnswer(answer)"
            >
                <span class="play-question__answer-text">
                    {{ answer.text }}
                </span>
            </Button>
        </div>
    </div>
</template>

<script setup>
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {usePlayStore} from "@/stores/play-store";
import Heading from "@/components/heading";
import Button from "@/components/button/button";

const playStore = usePlayStore();
const route = useRoute();
const router = useRouter();

playStore.setQuestionId(route.params.questionId);

onBeforeRouteUpdate((to, from, next) => {
    playStore.setQuestionId(to.params.questionId);
    next();
});

async function selectAnswer(answer) {
    const data = await playStore.selectAnswer(answer);

    if (data.resultId) {
        return router.push({
            name: 'play-result',
            params: { resultId: data.resultId },
        });
    }

    return router.push({
        name: 'play-question',
        params: {
            quizId: playStore.activeQuiz.id,
            questionId: data.nextQuestionId,
        }
    });
}
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
