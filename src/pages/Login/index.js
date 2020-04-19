import React, { memo, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '@api/request'

import './index.scss'

const { Item } = Form

const Login = props => {
	const history = useHistory()
	const onFinish = useCallback(values => {
		login(values)
			.then(res => {
				const { result } = res,
					{ token } = result
				if(!!token) {
					localStorage.setItem('token', token)
					message.success({ content: '登录成功', duration: 1.2 })
					history.replace('/admin')
				}
			})
			.catch(err => {
				console.log(err);
			})
	}, [])

	return (
		<div className="login-wrapper">
			<div className="login-content">
				<div className="title">哈萨Q博客管理后台</div>
				<Form
					name="login_form"
					onFinish={onFinish}
				>
					<Item
						name="username"
						rules={[
							{
								required: true,
								message: '请输入用户名',
							},
						]}
					>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="用户名"/>
					</Item>

					<Item
						name="password"
						rules={[
							{
								required: true,
								message: '请输入密码',
							},
						]}
					>
						<Input.Password
							placeholder="密码"
							prefix={<LockOutlined className="site-form-item-icon" />}
						/>
					</Item>
					<Item className="form-item-btn">
						<Button
							className="login-form-btn"
							type="primary"
							htmlType="submit">
							登录
						</Button>
					</Item>
				</Form>
			</div>
		</div>
	)
}

export default memo(Login)
