import axios from 'axios'
import { message } from 'antd'
import Loading from '@components/Loading'
import history from '../App/history'

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
            if(!['/login'].includes(config.url)) {
				const token = localStorage.getItem('token')
				config.headers.Authorization = `Bearer ${token}`
			}
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
				{ err_msg, result, err_no } = data
			if (Object.prototype.toString.call(result) === '[object String]') {
				message.success({
					content: result,
					duration: 1.2
				})
			}
			if(!!err_msg) {
				message.error(err_msg)
			}
			if(+err_no === 401) {
                history.replace('/login')
                return Promise.reject('token无效，需要重新登录')
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
