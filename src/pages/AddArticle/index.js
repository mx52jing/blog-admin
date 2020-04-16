import React, { memo, useCallback, useState } from 'react'
import { Row, Col, Input, Form, Button, message } from 'antd'
import MarkdownTpl from '@components/MarkdownTpl'
import MuiSelect from '@components/MuiSelect'
import { postData } from "@api/request";

import './index.scss'

const { Item } = Form,
	{ TextArea } = Input

const AddArticle = ({ resetFields }) => {
	const [articleContent, setArticleContent] = useState('')
	const onFinish = useCallback(values => {
		const {
				title,
				category,
				content,
			} = values,
			data = {
				title,
				category,
				content
			}
		postData('/articles', data)
			.then(res => {
                message.success(res.result)
				resetFields && resetFields()
			})
			.catch(err => {
				console.log(err);
			})
	}, [])
	const handleTextAreaChange = useCallback(event => {
		setArticleContent(event.target.value)
	}, [])
	return (
		<div className="add-article-wrapper">
			<Form
				onFinish={onFinish}>
				<Row>
					<Col span={11}>
						<Item
							name='title'
							rules={[{ required: true, message: '请输入文章标题' }]}>
							<Input
								size='large'
								placeholder="请输入文章标题"/>
						</Item>
					</Col>
					<Col span={12} offset={1}>
						<Item
							name='category'
							rules={[{ required: true, message: '请选择文章分类' }]}>
							<MuiSelect
								isAsync
								apiUrl='/categories'
								allowClear
								mode='multiple'
								placeholder='请选择文章分类'
								size='large'/>
						</Item>
					</Col>
				</Row>
				<Row>
					<Col span={11}>
						<Item
							name='content'
							rules={[{ required: true, message: '请输入文章内容' }]}>
							<TextArea
								onChange={handleTextAreaChange}
								placeholder='请输入文章内容'
								autoSize={{ minRows: 30, maxRows: 30 }}/>
						</Item>
					</Col>
					<Col offset={1} span={12}>
						<div className="article-show">
							<MarkdownTpl content={articleContent}/>
						</div>
					</Col>
				</Row>
				<Row>
					<Item>
						<Button size='large' type="primary" htmlType="submit">
							发表文章
						</Button>
					</Item>
				</Row>
			</Form>
		</div>
	)
}

export default memo(AddArticle)
