<template>
    <div class="answer-field">
        <label>Answer #{{ position }}</label>
        <TextField class="answer-field__text-field" v-model="answer.text" />

        <Radio :option="answer.id" v-model="question.correctId">
            Correct answer
        </Radio>
    </div>
</template>

<script setup>
import { TextField, Radio } from "../form";

defineProps({
    question: {
        type: Object,
        required: true
    },
    answer: {
        type: Object,
        required: true
    },
    position: {
        type: Number,
        required: true
    }
});
</script>

<style scoped>
.answer-field {
    display: flex;
    flex-direction: column;
}

.answer-field__text-field {
    margin-bottom: 8px;
}
</style>
