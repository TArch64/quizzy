<template>
    <div class="answer-field">
        <label>Answer #{{ position }}</label>
        <TextField class="answer-field__text-field" :name="answerName" />

        <label class="">
            <Field :name="correctRadioName" type="radio" :value="position" />
            Correct answer
        </label>
    </div>
</template>

<script setup>
import {computed} from "vue";
import {Field} from 'vee-validate';
import TextField from "@/components/form/text-field.vue";

const props = defineProps({
    questionPosition: {
        type: Number,
        required: true
    },
    position: {
        type: Number,
        required: true
    }
});

const baseName = computed(() => `questions[${props.questionPosition}]`);
const answerName = computed(() => `${baseName.value}answers[${props.position}]`)
const correctRadioName = computed(() => `${baseName.value}correct`);
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
