import axios from './axios'
/* article */
export const fetchArticleList = () => {
	return axios.get('/articles')
}
