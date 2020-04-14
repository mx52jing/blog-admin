import React, { memo } from 'react'
import { Layout } from 'antd'
import HomeLeft from './HomeLeft'
import HomeRight from './HomeRight'

import './index.scss'

const Home = () => {
	return (
		<Layout className="layout-wrapper">
			<HomeLeft/>
			<HomeRight/>
		</Layout>
	)
}

export default memo(Home)
