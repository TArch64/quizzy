import {usePlayStore} from "@/stores/play-store";

export async function loadPlayQuestionMiddleware(to, from, next) {
    const playStore = usePlayStore();
    await playStore.loadQuestion(to.params.questionId);
    next();
}
