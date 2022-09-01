import axios from '@/api/axios.js'

//访问权限，不同用户对应不同的菜单
export const getMenu = (params) => {
    return axios.request({
        url: '/permisson/getMenu',
        method: 'post',
        data: params
    })
}
// 手机登录
export const getMenuByphone = (params) => {
    return axios.request({
        url: '/permisson/loginByPhone',
        method: 'post',
        data: params
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })

}

export const getUser = (params) => {
    return axios.request({
        url: 'user/getUser',
        method: 'GET',
        params
    })
}

export const getGoods = (params) => {
    return axios.request({
        url: 'mall/getGoods',
        method: 'GEt',
        params
    })
}

export const getCode = (params) => {
    return axios.request({
        url: 'permisson/getCode',
        method: 'GET',
        params
    })
}