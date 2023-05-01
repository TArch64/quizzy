<template>
    <form class="quiz-new" @submit.prevent="onFormSubmit">
        <aside class="quiz-new__aside">
            <Heading class="quiz-new__heading" level="1">
                Create a new Quiz
            </Heading>

            <QuestionsMenu />
        </aside>

        <div class="quiz-new__question-editor">
            <QuestionField />
        </div>
    </form>
</template>

<script setup>
import Heading from "@/components/heading.vue";
import QuestionField from "@/components/quiz-builder/question-field.vue";
import QuestionsMenu from "@/components/quiz-builder/questions-menu.vue";
import {useNewQuizStore} from "@/stores/new-quiz-store";

const onFormSubmit = () => {
    console.log('submit');
};
</script>

<style scoped>
.quiz-new {
    display: flex;
    height: 100%;
}

.quiz-new__aside {
    width: 300px;
    flex-shrink: 0;
    border-right: 1px solid black;
    padding-top: 16px;
    padding-bottom: 16px;
}

.quiz-new__question-editor {
    flex-grow: 1;
}

.quiz-new__heading {
    margin-bottom: 16px;
    text-align: center;
}
</style>
