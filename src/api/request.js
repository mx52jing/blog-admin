import axios from './axios'
/*
* 通用接口
* */
// 请求数据
export const getData = (url, params = {}, requestOpt) => axios(requestOpt).get(url, params)
// 提交数据
export const postData = (url, data = {}, requestOpt) => axios(requestOpt).post(url, data)
// 更新数据
export const updateData = (url, data = {}, requestOpt) => axios(requestOpt).put(url, data)
// 删除数据
export const deleteData = (url, data = {}, requestOpt) => axios(requestOpt).delete(url, data)
/* 登录 */
export const login = (data = {}, requestOpt) => axios(requestOpt).post('/login', data)
