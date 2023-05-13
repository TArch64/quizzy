<template>
    <ul class="quiz-new__questions">
        <li
            v-for="(question, index) of newQuizStore.questions"
            :key="question.id"
            class="quiz-new__questions-item"
            :class="getQuestionClasses(question)"
        >
            <Button
                class="quiz-new__questions-item__title"
                @click="newQuizStore.activateQuestion(question)"
            >
                {{ question.question || `Question #${index}` }}
            </Button>

            <Button
                class="quiz-new__questions-item__delete"
                look="link"
                @click="newQuizStore.removeQuestion(question.id)"
                v-if="newQuizStore.questions.length > 1"
            >
                Delete
            </Button>
        </li>

        <Button
            class="quiz-new__questions-add"
            look="link"
            @click="newQuizStore.addQuestion"
        >
            Add question
        </Button>
    </ul>
</template>

<script setup>
import Button from "@/components/button/button";
import {useNewQuizStore} from "@/stores/new-quiz-store";

const newQuizStore = useNewQuizStore();

const isActiveQuestion = (question) => question.id === newQuizStore.activeQuestion.id;

const getQuestionClasses = (question) => ({
    'quiz-new__questions-item--active': isActiveQuestion(question)
});
</script>

<style scoped>
.quiz-new__questions {
    margin: 0;
    padding: 0;
}

.quiz-new__questions-item {
    list-style-type: none;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-left: 3px solid lightgray;
}

.quiz-new__questions-item:last-of-type {
    margin-bottom: 16px;
}

.quiz-new__questions-item--active {
    border-left-color: black;
}

.quiz-new__questions-item__title {
    text-align: left;
    padding: 8px 16px;
    flex-grow: 1;
}

.quiz-new__questions-item__delete {
    flex-shrink: 0;
    padding-right: 16px;
}

.quiz-new__questions-add {
    display: block;
    margin: auto;
    width: 100%;
}
</style>
