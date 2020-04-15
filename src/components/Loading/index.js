import React, { createElement } from 'react'
import { unmountComponentAtNode, render } from 'react-dom'
import { Spin } from 'antd'

import './index.scss'

const LoadingComp = props => {
	return (
		<div className="loading-wrapper">
			<Spin {...props} />
		</div>
	)
}
const Loading = {},
	defaultOptions = {
		size: 'large',
		tip: ''
	},
	el = document.createElement('div')

Loading.show = (options = {}) => {
	const loadingOptions = Object.assign({}, defaultOptions, options)
	document.body.appendChild(el)
	const loadingEl = createElement(LoadingComp, loadingOptions)
	render(loadingEl, el)
}

Loading.hide = () => unmountComponentAtNode(el)

export default Loading
