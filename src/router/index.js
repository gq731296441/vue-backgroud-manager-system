import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/views/Main.vue'



Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/home',
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
            },
            {
                path: 'page1',
                component: () => import('@/views/other/pageOne.vue'),
                name: 'page1'
            },
            {
                path: 'page2',
                component: () => import('@/views/other/pageTwo.vue'),
                name: 'page2'
            }
        ]
    }
]

const router = new VueRouter({
    node: 'history',
    routes
})

export default router