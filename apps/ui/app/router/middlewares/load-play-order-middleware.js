import {usePlayStore} from "@/stores/play-store";

export async function loadPlayOrderMiddleware(to, from, next) {
    const playStore = usePlayStore();
    await playStore.loadOrder(to.params.quizId);

    if (to.params.questionId) {
        return next();
    }

    return next({
        name: 'play-question',
        params: {
            quizId: to.params.quizId,
            questionId: playStore.nextQuestionId
        }
    });
}
