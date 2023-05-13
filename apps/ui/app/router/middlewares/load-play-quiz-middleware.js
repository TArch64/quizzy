import {usePlayStore} from "@/stores/play-store";

export async function loadPlayQuizMiddleware(to, from, next) {
    const playStore = usePlayStore();
    await playStore.loadQuiz(to.params.quizId);

    if (to.params.questionId) {
        return next();
    }

    return next({
        name: 'play-question',
        params: {
            quizId: to.params.quizId,
            questionId: playStore.nextQuestion.id
        }
    });
}
