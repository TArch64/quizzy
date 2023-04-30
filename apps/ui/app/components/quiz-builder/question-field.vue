<template>
    <li class="question-field">
        <div class="question-field__header">
            Question #{{ position }}

            <Button @click="$emit('delete')">
                Delete
            </Button>
        </div>

        <div class="question-field__body">
            <label>Question</label>
            <TextField class="question-field__question" :name="`${baseName}question`" />

            <FieldArray :name="`${baseName}answers`" v-slot="{ fields }">
                <AnswerField
                    class="question-field__answer"
                    v-for="(_, index) of fields"
                    :question-position="position"
                    :position="index"
                />
            </FieldArray>
        </div>
    </li>
</template>

<script setup>
import {computed} from "vue";
import {FieldArray} from 'vee-validate';
import TextField from "@/components/form/text-field.vue";
import Button from "@/components/button/button.vue";
import AnswerField from "@/components/quiz-builder/answer-field.vue";

const props = defineProps({
    position: {
        type: Number,
        required: true
    }
});

defineEmits(['delete']);

const baseName = computed(() => `questions[${props.position}]`)
</script>

<style scoped>
.question-field {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    border: 1px solid black;
}

.question-field__header {
    text-align: left;
    padding: 8px 16px;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.question-field__body {
    padding: 8px 16px;
}

.question-field__question {
    margin-bottom: 32px;
}

.question-field__answer {
    margin-bottom: 16px;
}
</style>
