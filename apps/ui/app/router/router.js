import { createRouter, createWebHistory } from 'vue-router'
import {loadPlayQuizMiddleware} from "@/router/middlewares/load-play-quiz-middleware";

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
            path: '/play/:quizId',
            beforeEnter: loadPlayQuizMiddleware,
            children: [
                {
                    path: '',
                    component: () => import('../views/play/play-loader')
                },
                {
                    name: 'play-question',
                    path: 'questions/:questionId',
                    component: () => import('../views/play/play-question')
                }
            ]
        },
        {
            name: 'play-result',
            path: '/play-results/:resultId',
            component: () => import('../views/play/play-result')
        }
    ]
});
