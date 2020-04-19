import axios from 'axios'
import { message } from 'antd'
import Loading from '@components/Loading'

const options = {
		baseURL: 'http://127.0.0.1:3002/admin',
		timeout: 6000,
		withCredentials: true
	},
	requestOpt = {
		isLoading: true
	}


export default function (opt = {}) {
	opt = Object.assign({}, requestOpt, opt)
	const { isLoading } = opt,
		instance = axios.create(options)
	instance.interceptors.request.use(
		config => {
			isLoading && Loading.show()
			return config
		},
		error => {
			isLoading && Loading.hide()
			Promise.reject(error)
		}
	)

	instance.interceptors.response.use(
		response => {
			isLoading && Loading.hide()
			const { data = {} } = response,
				{ result } = data
			if (Object.prototype.toString.call(result) === '[object String]') {
				message.success({
					content: result,
					duration: 1.2
				})
			}
			return data
		},
		error => {
			isLoading && Loading.hide()
			Promise.reject(error)
		}
	)
	return instance
}
