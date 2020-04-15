import axios from './axios'
/* 文章 article */
export const fetchArticleList = () => axios.get('/articles')
/* 分类 */
// 获取分类
export const fetchCategories = () => axios.get('/categories')
// 添加分类
export const addCategory = payload => axios.post('/categories', payload)
// 删除分类
export const deleteCategory = ({ id }) => axios.delete(`/categories/${id}`)
// 编辑分类

