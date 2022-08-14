import Cookie from 'js-cookie'
export default {
    state: {
        token: ''
    },
    mutations: {
        // 在cookie中存储token
        setToken (state, val) {
            state.token = val
            Cookie.set('token', val)
        },
        // 移除token的值
        removeToken (state) {
            state.token = ''
            Cookie.remove('token')
        },
        // 获取token的值
        getToken (state) {
            state.token = state.token || Cookie.get('token')
        }
    }
}