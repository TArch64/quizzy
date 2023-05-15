import { createRouter, createWebHistory } from 'vue-router'
import { loadPlayQuizMiddleware, loadPlayResultMiddleware } from "./middlewares";
import { Welcome, QuizNew, QuizNewSuccess, PlayQuestion, PlayResult } from '../views';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'welcome',
            path: '/',
            component: Welcome
        },
        {
            path: '/quiz',
            children: [
                {
                    name: 'new',
                    path: 'new',
                    component: QuizNew
                },
                {
                    name: 'new-success',
                    path: ':quizId/success',
                    component: QuizNewSuccess
                }
            ]
        },
        {
            name: 'play-question',
            path: '/play/:quizId',
            beforeEnter: loadPlayQuizMiddleware,
            component: PlayQuestion
        },
        {
            name: 'play-result',
            path: '/play-results/:resultId',
            beforeEnter: loadPlayResultMiddleware,
            component: PlayResult
        }
    ]
});
