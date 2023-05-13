import {computed, reactive, ref} from "vue";

export function usePlayState() {
    const activeQuiz = ref(null);
    const activeQuestion = ref(null);
    const answeredQuestions = [];

    const questions = computed(() => activeQuiz.value?.questions ?? []);

    const activeQuestionIndex = computed(() => {
        if (!activeQuestion.value) return -1;

        return questions.value.findIndex((question) => {
            return question.id === activeQuestion.value.id;
        });
    });

    const nextQuestion = computed(() => questions.value[activeQuestionIndex.value + 1]);

    const setQuiz = quiz => activeQuiz.value = quiz;
    const setQuestionId = id => activeQuestion.value = questions.value.find(question => question.id === id);

    function selectAnswer(answer) {
        answeredQuestions.push({
            questionId: activeQuestion.value.id,
            answerId: answer.id
        });
    }

    return reactive({
        activeQuiz,
        setQuiz,
        activeQuestion,
        answeredQuestions,
        nextQuestion,
        selectAnswer,
        setQuestionId
    });
}
