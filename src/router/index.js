import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/views/Main.vue'



Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: () => import('@/views/Main.vue'),
        name: 'Main',
        children: [
            {
                path: 'home',
                component: () => import ('@/views/Home/Home.vue'),
                name: 'home'
            },
            {
                path: 'mall',
                component: () => import('@/views/Mall/Mall.vue'),
                name: 'mall',

            },
            {
                path: 'user',
                component: () => import('@/views/User/User.vue'),
                name: 'user'
            }
        ]
    }
]

const router = new VueRouter({
    node: 'history',
    routes
})

export default router