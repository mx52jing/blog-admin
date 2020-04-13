import React, { memo } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import AddArticle from '../AddArticle'

import './index.scss'

const { Header, Content, Footer } = Layout

const HomeRight = props => {
	const { path, url } = useRouteMatch()
	console.log(path, url);
	return (
		<Layout className="site-layout">
			<Header className="site-layout-background" style={{ padding: 0 }}/>
			<Content style={{ margin: '0 16px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>User</Breadcrumb.Item>
					<Breadcrumb.Item>Bill</Breadcrumb.Item>
				</Breadcrumb>
				<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
					<Switch>
						<Route path='/admin/article' component={AddArticle}/>
					</Switch>
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>哈撒Q博客后台系统</Footer>
		</Layout>
	)
}

export default memo(HomeRight)
