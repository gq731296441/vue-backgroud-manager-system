import axios from '@/api/axios.js'

//访问安县，不同用户对应不同的菜单
export const getMenu = (params) => {
    return axios.request({
        url: '/permisson/getMenu',
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