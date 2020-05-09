import React, { memo, useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import { updateData } from '@api/request'

const { Item } = Form

const CategoryEdit = ({ data, onCancel, fetchCategoryData }) => {
	const { name, _id } = data
	const onFinish = useCallback(value => {
		updateData(`/categories/${_id}`, value)
			.then(({ err_no }) => {
				if (+err_no === 1) return
				fetchCategoryData && fetchCategoryData()
				onCancel && onCancel()
			})
			.catch(err => {
				console.log(err);
			})
	}, [])
	return (
		<Form
			initialValues={{ name }}
			name='category_form'
			onFinish={onFinish}>
			<Item
				name="name"
				rules={[
					{
						required: true,
						message: '请输入分类名称'
					},
				]}
			>
				<Input placeholder="请输入分类名"/>
			</Item>
			<Item className="form-item-btn">
				<Button onClick={onCancel}>取消</Button>
				<Button
					type="primary"
					htmlType="submit">
					确定
				</Button>
			</Item>
		</Form>
	)
}

export default memo(CategoryEdit)

