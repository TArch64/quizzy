import { usePlayResultStore } from "@/stores";

export async function loadPlayResultMiddleware(to, from, next) {
    const resultStore = usePlayResultStore();
    await resultStore.load(to.params.resultId);
    next();
}
