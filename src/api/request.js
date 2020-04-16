import axios from './axios'
/*
* 通用接口
* */
// 请求数据
export const getData = (url, params = {}) => axios.get(url, params)
// 提交数据
export const postData = (url, data = {}) => axios.post(url, data)
// 更新数据
export const updateData = (url, data = {}) => axios.put(url, data)
// 删除数据
export const deleteData = (url, data = {}) => axios.delete(url, data)
