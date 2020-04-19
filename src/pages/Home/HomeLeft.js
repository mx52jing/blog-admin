import React, { memo, useState, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
	FolderOutlined,
	ProfileOutlined,
	HomeOutlined
} from '@ant-design/icons'

const { Sider } = Layout,
	{ SubMenu } = Menu

const HomeLfet = () => {
	const history = useHistory(),
		{ pathname = '' } = useLocation(),
		str = pathname.match(/\/admin\/articleEdit\/([0-9a-zA-Z]+)/),
		disabled = !!str && +str[1] !== 0
	const [collapsed, setCollapsed] = useState(false)
	const onCollapse = useCallback(collapsed => {
		setCollapsed(collapsed)
	}, [])
	const handleClick = useCallback(({ item, key }) => {
		history.push(key)
	}, [])
	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={onCollapse}>
			<div className='logo'>哈萨Q博客管理后台</div>
			<Menu
				onClick={handleClick}
				theme='dark'
				defaultSelectedKeys={[pathname]}
				mode='inline'>
				<Menu.Item key='/admin'>
					<HomeOutlined/>
					<span>首页</span>
				</Menu.Item>
				<SubMenu
					title={
						<span>
							<FolderOutlined/>
							<span>文章管理</span>
						</span>
					}>
					<Menu.Item
						disabled={disabled}
						key='/admin/articleEdit/0'>
						添加文章
					</Menu.Item>
					<Menu.Item key='/admin/articleList'>文章列表</Menu.Item>
				</SubMenu>
				<Menu.Item key='/admin/category'>
					<ProfileOutlined/>
					<span>分类管理</span>
				</Menu.Item>
			</Menu>
		</Sider>

	)
}

export default memo(HomeLfet)
