import {usePlayResultStore} from "@/stores/play-result-store";

export async function loadPlayResultMiddleware(to, from, next) {
    const resultStore = usePlayResultStore();
    await resultStore.load(to.params.resultId);
    next();
}
