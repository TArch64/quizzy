import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'welcome',
            path: '/',
            component: () => import('./views/welcome')
        },
        {
            path: '/quiz',
            children: [
                {
                    name: 'new',
                    path: 'new',
                    component: () => import('./views/quiz/new'),
                },
                {
                    name: 'new-success',
                    path: ':quizId/success',
                    component: () => import('./views/quiz/new-success')
                }
            ]
        },
        {
            path: '/play/:quizId',
            component: () => import('./views/play/play'),
            children: [
                {
                    path: '',
                    component: () => import('./views/play/play-loader')
                },
                {
                    name: 'play-question',
                    path: 'questions/:questionId',
                    component: () => import('./views/play/play-question')
                }
            ]
        }
    ]
});
