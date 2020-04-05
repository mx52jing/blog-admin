import React, { memo, useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './index.scss'

const { Item } = Form

const Login = props => {
	const onFinish = useCallback(values => {
		console.log('Success:', values)
	}, [])

	const onFinishFailed = useCallback(errorInfo => {
		console.log('Failed:', errorInfo)
	}, [])
	return (
		<div className="login-wrapper">
			<div className="login-content">
				<Form
					name="login_form"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
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
