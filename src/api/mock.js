import Mock from 'mockjs'
import homeApi from '@/api/mockServeData/home.js'

Mock.mock('/home/getData', homeApi.getStatisticalData)
