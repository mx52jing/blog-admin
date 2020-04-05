import axios from 'axios'

const options = {
	// baseURL: '',
	timeout: 6000,
	withCredentials: true,
	transformRequest: [data => {
		return JSON.stringify(data)
	}]
}

const instance = axios.create(options)

instance.interceptors.request.use(
	config => {
		return config
	},
	error => Promise.reject(error)
)

instance.interceptors.response.use(
	response => {
		const { data } = response
		return data
	},
	error => Promise.reject(error)
)

export default instance
