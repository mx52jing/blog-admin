import axios from 'axios'
import Loading from '@components/Loading'

const options = {
	baseURL: 'http://127.0.0.1:3002/admin',
	timeout: 6000,
	withCredentials: true
}

const instance = axios.create(options)

instance.interceptors.request.use(
	config => {
		Loading.show()
		return config
	},
	error => {
		Loading.hide()
		Promise.reject(error)
	}
)

instance.interceptors.response.use(
	response => {
		Loading.hide()
		const { data } = response
		return data
	},
	error => {
		Loading.hide()
		Promise.reject(error)
	}
)

const requestObj = {},
	fetchMethods = ['get', 'post', 'put', 'delete']
fetchMethods.forEach(item => {
	requestObj[item] = opt => instance[item](opt)
})

console.log(requestObj);
export default instance
