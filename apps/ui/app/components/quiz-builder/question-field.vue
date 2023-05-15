<template>
    <div class="question-field">
        <label>Question</label>
        <TextField class="question-field__question" v-model="activeQuestion.text" />

        <AnswerField
            class="question-field__answer"
            v-for="(answer, index) of activeQuestion.answers"
            :key="answer.id"
            :answer="answer"
            :position="index"
            :question="activeQuestion"
        />
    </div>
</template>

<script setup>
import { toRef } from "vue";
import { useNewQuizStore } from "@/stores";
import { TextField } from "../form";
import AnswerField from "./answer-field";

const newQuizStore = useNewQuizStore();
const activeQuestion = toRef(newQuizStore, 'activeQuestion');
</script>

<style scoped>
.question-field {
    padding: 16px;
}

.question-field__question {
    margin-left: 8px;
    margin-bottom: 32px;
}

.question-field__answer {
    margin-bottom: 16px;
}
</style>
