<template>
  <div class="quiz-new">
      <Heading class="quiz-new__heading" level="1">
          Create a new Quiz
      </Heading>

      <Form :validation-schema="schema" :initial-values="initialValues" v-slot="{ values }">
          <TextField class="quiz-new__name-field" name="name" />

          <ul class="quiz-new__questions">
              <FieldArray name="questions" v-slot="{ fields, push, remove }">
                  <QuestionField
                      class="quiz-new__question"
                      v-for="(field, index) of fields"
                      :key="field.key"
                      :position="index"
                      @delete="remove(index)"
                  />

                  <Button class="quiz-new__questions-add" @click="push(createQuestion())">
                      Add question
                  </Button>
              </FieldArray>
          </ul>

          <pre>{{ JSON.stringify(values, null, 2) }}</pre>
      </Form>
  </div>
</template>

<script setup>
import * as yup from 'yup';
import {Form, FieldArray} from "vee-validate";
import Heading from "@/components/heading.vue";
import TextField from "@/components/form/text-field.vue";
import QuestionField from "@/components/quiz-builder/question-field.vue";
import Button from "@/components/button/button.vue";

const answerSchema = yup.string().required();

const questionSchema = yup.object({
    question: yup.string().required(),
    answers: yup.array().length(4).of(answerSchema),
    correct: yup.number().transform((value) => parseInt(value)).integer().required()
});

const schema = yup.object({
    name: yup.string().required(),
    questions: yup.array().min(1).of(questionSchema)
});

const createQuestion = () => ({
    question: '',
    answers: ['', '', '', ''],
    correct: 0
});

const initialValues = {
    name: '',
    questions: [createQuestion()]
};
</script>

<style scoped>
.quiz-new {
    padding: 32px 20%;
    display: flex;
    align-items: stretch;
    flex-direction: column;
}

.quiz-new__heading {
    text-align: center;
    margin-bottom: 48px;
}

.quiz-new__name-field {
    margin-bottom: 24px;
}

.quiz-new__questions {
    margin: 0;
    padding: 0;
}

.quiz-new__question {
    margin-bottom: 32px;
}

.quiz-new__questions-add {
    display: block;
    margin: auto;
}
</style>
