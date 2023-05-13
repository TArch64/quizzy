import {usePlayStore} from "@/stores/play-store";

export async function loadPlayQuizMiddleware(to, from, next) {
    const playStore = usePlayStore();
    await playStore.loadQuiz(to.params.quizId);
    return next();
}
