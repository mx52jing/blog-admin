import React, { memo, useCallback } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import { Layout } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import HomeContent from './HomeContent'
import AddArticle from '../AddArticle'
import ArticleList from '../ArticleList'
import Category from '../Category'

import './index.scss'

const { Content, Footer, Header } = Layout

const HomeRight = () => {
	const { path } = useRouteMatch(),
		history = useHistory()
	const handleLogOut = useCallback(() => {
		localStorage.setItem('token', null)
        history.replace('/login')
		// eslint-disable-next-line
	}, [])
	return (
		<Layout className="site-layout">
            <Header className="site-layout-background site-layout-header">
				<span
					onClick={handleLogOut}
					className="logout-btn">
                    <LogoutOutlined />
					退出登录
				</span>
			</Header>
			<Content>
				<div className="site-layout-background site-layout-content">
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
