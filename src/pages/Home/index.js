import React, { memo, useState, useCallback } from 'react'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import {
	FolderOutlined,
	TagsOutlined,
	ProfileOutlined
} from '@ant-design/icons'
import AddArticle from '../AddArticle'

import './index.scss'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const Home = props => {
	const { path, url } = useRouteMatch()
	console.log(path, url);
	const [collapsed, setCollapsed] = useState(false)
	const onCollapse = useCallback(collapsed => {
		setCollapsed(collapsed)
	}, [])
	return (
		<div className="layout-wrapper">
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={onCollapse}>
					<div className="logo">哈撒Q博客管理后台</div>
					<Menu
						theme="dark"
						defaultSelectedKeys={['1']}
						mode="inline">
						<SubMenu
							key="sub1"
							title={
								<span>
                                    <FolderOutlined />
									<Link to='/articles'>文章管理</Link>
                				</span>
							}>
							<Menu.Item key="1">文章列表</Menu.Item>
							<Menu.Item key="2">添加文章</Menu.Item>
						</SubMenu>
						<Menu.Item key="3">
							<ProfileOutlined />
							<span>分类管理</span>
						</Menu.Item>
						<Menu.Item key="4">
							<TagsOutlined />
							<span>标签管理</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0 }}/>
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Bill</Breadcrumb.Item>
						</Breadcrumb>
						<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
							<Switch>
								<Route to={`${url}/articles`} component={AddArticle}/>
							</Switch>
							{/*<AddArticle />*/}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>哈撒Q博客后台系统</Footer>
				</Layout>
			</Layout>
		</div>
	)
}

export default memo(Home)
