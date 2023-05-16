import { usePlayStore } from "../../stores";

export async function loadPlayQuizMiddleware(to, from, next) {
    const playStore = usePlayStore();
    await playStore.loadQuiz(to.params.quizId);
    return next();
}
