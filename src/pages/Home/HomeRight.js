import React, { memo } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Layout } from 'antd'
import HomeContent from './HomeContent'
import AddArticle from '../AddArticle'
import ArticleList from '../ArticleList'
import Category from '../Category'

import './index.scss'

const { Content, Footer } = Layout

const HomeRight = props => {
	const { path } = useRouteMatch()
	return (
		<Layout className="site-layout">
			<Content style={{ margin: '0 16px' }}>
				<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
					<Switch>
						<Route exact path={path} component={HomeContent}/>
						<Route path={`${path}/articleEdit/:id`} component={AddArticle}/>
						<Route path={`${path}/articleList`} component={ArticleList}/>
						<Route path={`${path}/category`} component={Category}/>
					</Switch>
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>哈撒Q博客后台系统</Footer>
		</Layout>
	)
}

export default memo(HomeRight)
