import axios from '@/api/axios.js'

export const getMenu = (param) => {
    return axios.request({
        url: '/permisson/getMenu',
        method: 'post',
        data: {
            param
        }
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })

}