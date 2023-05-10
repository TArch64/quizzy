import { createRouter, createWebHistory } from 'vue-router'
import {loadPlayOrderMiddleware} from "@/router/middlewares/load-play-order-middleware";
import {loadPlayQuestionMiddleware} from "@/router/middlewares/load-play-question-middleware";

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
            beforeEnter: loadPlayOrderMiddleware,
            children: [
                {
                    path: '',
                    component: () => import('../views/play/play-loader')
                },
                {
                    name: 'play-question',
                    path: 'questions/:questionId',
                    beforeEnter: loadPlayQuestionMiddleware,
                    component: () => import('../views/play/play-question')
                }
            ]
        }
    ]
});
