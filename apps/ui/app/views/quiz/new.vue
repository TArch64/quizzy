<template>
    <form class="quiz-new" @submit.prevent="onFormSubmit">
        <header class="quiz-new__header">
            <Heading class="quiz-new__heading" level="1">
                Create a new Quiz
            </Heading>

            <Button look="primary" type="submit">
                Create
            </Button>
        </header>

        <aside class="quiz-new__aside">
            <QuestionsMenu />
        </aside>

        <div class="quiz-new__question-editor">
            <QuestionField />
        </div>
    </form>
</template>

<script setup>
import {useRouter} from "vue-router";
import Heading from "@/components/heading";
import QuestionField from "@/components/quiz-builder/question-field";
import QuestionsMenu from "@/components/quiz-builder/questions-menu";
import {useNewQuizStore} from "@/stores/new-quiz-store";
import Button from "@/components/button/button";

const newQuizStore = useNewQuizStore();
const router = useRouter();

async function onFormSubmit() {
    const validation = await newQuizStore.validate();

    if (validation) {
        alert(validation);
        return;
    }

    const quiz = await newQuizStore.create();

    await router.push({ name: 'new-success', params: { quizId: quiz.id } });
}
</script>

<style scoped>
.quiz-new {
    display: grid;
    height: 100%;
    grid-template-areas: "header header" "aside question-editor";
    grid-template-columns: 300px 1fr;
    grid-template-rows: auto 1fr;
}

.quiz-new__header {
    grid-area: header;
    border-bottom: 1px solid black;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.quiz-new__aside {
    grid-area: aside;
    flex-shrink: 0;
    border-right: 1px solid black;
    padding-bottom: 16px;
}

.quiz-new__question-editor {
    grid-area: question-editor;
    max-width: 700px;
}
</style>
