import { createRouter, createWebHistory } from 'vue-router'
import {loadPlayQuizMiddleware} from "@/router/middlewares/load-play-quiz-middleware";
import {loadPlayResultMiddleware} from "@/router/middlewares/load-play-result-middleware";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'welcome',
            path: '/',
            component: () => import('../views/welcome')
        },
        {
            path: '/quiz',
            children: [
                {
                    name: 'new',
                    path: 'new',
                    component: () => import('../views/quiz/new'),
                },
                {
                    name: 'new-success',
                    path: ':quizId/success',
                    component: () => import('../views/quiz/new-success')
                }
            ]
        },
        {
            name: 'play-question',
            path: '/play/:quizId',
            beforeEnter: loadPlayQuizMiddleware,
            component: () => import('../views/play/play-question')
        },
        {
            name: 'play-result',
            path: '/play-results/:resultId',
            beforeEnter: loadPlayResultMiddleware,
            component: () => import('../views/play/play-result')
        }
    ]
});
