import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/views/Main.vue'
import store from '@/store/index.js'


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
    },

    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/login.vue')
    }
]

const router = new VueRouter({
    node: 'history',
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 获取token，防止页面刷新导致state中的token丢失
    store.commit('getToken')
    const token = store.state.user.token
    // 如果没有token并且访问的不是login，那么都跳转到login
    if (!token && to.name !== 'login') {
        next({name: 'login'})
    } else if (token && to.name === 'login') {
        next({name: 'home'})
    } else {
        next()
    }
})
  


export default router

