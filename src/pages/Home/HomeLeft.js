import React, { memo, useState, useCallback } from 'react'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import {
	FolderOutlined,
	TagsOutlined,
	ProfileOutlined,
	HomeOutlined
} from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const HomeLfet = props => {
	const [collapsed, setCollapsed] = useState(false)
	const onCollapse = useCallback(collapsed => {
		setCollapsed(collapsed)
	}, [])
	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={onCollapse}>
			<div className="logo">哈撒Q博客管理后台</div>
			<Menu
				theme="dark"
				defaultSelectedKeys={['399']}
				mode="inline">
				<Menu.Item key="399">
					<HomeOutlined/>
					<span>首页</span>
				</Menu.Item>
				<SubMenu
					key="sub1"
					title={
						<span>
							<FolderOutlined/>
							<span>文章管理</span>
						</span>
					}>
					<Menu.Item key="/article/list">文章列表</Menu.Item>
					<Menu.Item key="2">添加文章</Menu.Item>
				</SubMenu>
				<Menu.Item key="3">
					<ProfileOutlined/>
					<span>分类管理</span>
				</Menu.Item>
			</Menu>
		</Sider>

	)
}

export default memo(HomeLfet)
