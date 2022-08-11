import axios from '@/axios/axios.js'

export const getMenu = (param) => {
    return axios.request({
        url: '/permisson/getMenu',
        method: 'post',
        data: {
            param
        }
    })
}