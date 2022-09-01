import Mock from 'mockjs'
import homeApi from '@/api/mockServeData/home.js'
import userApi from '@/api/mockServeData/user.js'
import permissonApi from '@/api/mockServeData/permission.js'

// Mock.mock( rurl, rtype, function( options ) )
// 记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。

// 拦截请求，并做出对应的操作
Mock.mock('/home/getData', homeApi.getStatisticalData)

// 拦截新增用户的请求，通过对应的函数来模拟后端返回的信息
Mock.mock('/user/add', 'post', userApi.createUser)
//  拦截编辑用户的请求，通过userApi中的updateUser模拟后端返回的消息
Mock.mock(/user\/edit/, 'post', userApi.updateUser)

Mock.mock(/user\/getUser/, 'get', userApi.getUserList)

Mock.mock(/user\/del/, 'get', userApi.deleteUser)

// 拦截登录的请求，返回对应的菜单和token
Mock.mock(/permisson\/getMenu/, 'post', permissonApi.getMenu)

Mock.mock(/permisson\/getCode/, 'get', permissonApi.getCode)

Mock.mock(/permisson\/loginByPhone/, 'post', permissonApi.getMneu_phone)
