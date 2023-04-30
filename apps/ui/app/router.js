import {createRouter, createWebHistory} from 'vue-router'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'welcome',
            path: '/',
            component: () => import('./views/welcome')
        },
        {
            name: 'new',
            path: '/quiz/new',
            component: () => import('./views/new')
        }
    ]
})
