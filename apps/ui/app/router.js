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
            children: [
                {
                    name: 'play',
                    path: '',
                    component: () => import('./views/play/play')
                }
            ]
        }
    ]
});
