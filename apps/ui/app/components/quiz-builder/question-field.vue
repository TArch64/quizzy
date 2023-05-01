<template>
    <div class="question-field">
        <label>Question</label>
        <TextField class="question-field__question" v-model="activeQuestion.question" />

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
import {toRef} from "vue";
import TextField from "@/components/form/text-field.vue";
import AnswerField from "@/components/quiz-builder/answer-field.vue";
import {useNewQuizStore} from "@/stores/new-quiz-store";

const newQuizStore = useNewQuizStore();
const activeQuestion = toRef(newQuizStore, 'activeQuestion');
</script>

<style scoped>
.question-field {
    padding: 8px 16px;
}

.question-field__question {
    margin-bottom: 32px;
}

.question-field__answer {
    margin-bottom: 16px;
}
</style>
